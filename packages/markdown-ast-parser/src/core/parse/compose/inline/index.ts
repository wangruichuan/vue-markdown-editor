import { Tokens } from "@/types/tokens";
import { TokenTypeVal } from "@/types/tokens-types";

interface MarkdownPattern {
  regex: RegExp;
  process: (match: RegExpMatchArray, context: ProcessContext) => Tokens;
}

interface ProcessContext {
  line: string;
  index: number;
  offset: number;
  currentOffset: number;
  parseInlineElements: (line: string, index: number, currentOffset: number) => Tokens[];
}

//粗体，斜体，下划线，删除线,行内代码,图片,链接
const MARKDOWN_PATTERNS: Record<string, MarkdownPattern> = {
  bold: {
    regex: /\*\*(?<content>.*?)\*\*/,
    process: (match, context) => createStandardToken("bold" as TokenTypeVal, match, context),
  },
  italic: {
    regex: /\_(?<content>.*?)\_/,
    process: (match, context) => createStandardToken("italic" as TokenTypeVal, match, context),
  },
  underline: {
    regex: /\-{2}(?<content>.*?)\-{2}/,
    process: (match, context) => createStandardToken("underline" as TokenTypeVal, match, context),
  },
  delete: {
    regex: /\~{2}(?<content>.*?)\~{2}/,
    process: (match, context) => createStandardToken("delete" as TokenTypeVal, match, context),
  },
  inlineCode: {
    regex: /`(?<content>.*?)`/,
    process: (match, context) => {
      // 如果匹配的内容为空，创建文本节点
      if (!match[1].trim()) {
        return createTextToken(match[0], match, context);
      }
      // 创建内联代码节点
      return {
        type: "inlineCode",
        children: [createTextToken(match.groups?.content || "", match, context)],
        position: createPosition(match, context),
      };
    },
  },
  image: {
    regex: /!\[(?<alt>.*?)\]\((?<url>.*?)\)/,
    process: (match, context) => ({
      type: "image",
      title: null,
      url: match.groups?.url || "",
      alt: match.groups?.alt || "",
      position: createPosition(match, context),
    }),
  },
  link: {
    regex: /(?<!!)\[(?<text>[^\]]+)\]\((?<url>[^)]+)\)/,
    process: (match, context) => ({
      type: "link",
      title: null,
      url: match.groups?.url || "",
      children: [createTextToken(match.groups?.text || "", match, context)],
      position: createPosition(match, context),
    }),
  },
};

/**
 * 创建位置信息
 * @param match 正则表达式匹配结果
 * @param context 处理上下文
 * @returns 包含起始和结束位置信息的对象
 */
function createPosition(match: RegExpMatchArray, context: ProcessContext) {
  // 计算起始偏移量
  const startOffset = context.currentOffset + context.offset + (match.index ?? 0);
  // 计算结束偏移量
  const endOffset = startOffset + match[0].length;

  return {
    start: {
      line: context.index + 1,
      column: context.offset + (match.index ?? 0) + 1,
      offset: startOffset,
    },
    end: {
      line: context.index + 1,
      column: context.offset + (match.index ?? 0) + match[0].length + 1,
      offset: endOffset,
    },
  };
}

/**
 * 创建文本节点
 * @param value 文本节点的值
 * @param match 正则表达式匹配结果
 * @param context 处理上下文
 * @returns 文本节点的 Tokens 对象
 */
function createTextToken(value: string, match: RegExpMatchArray, context: ProcessContext): Tokens {
  return {
    type: "text",
    value,
    position: createPosition(match, context),
  };
}

/**
 * 创建标准内联标记节点
 * @param type 标记类型
 * @param match 正则表达式匹配结果
 * @param context 处理上下文
 * @returns 标准内联标记节点的 Tokens 对象
 */
function createStandardToken(
  type: TokenTypeVal,
  match: RegExpMatchArray,
  context: ProcessContext,
): Tokens {
  // 获取匹配的内容
  const innerContent = match.groups?.content || match[1];
  // 计算内部偏移量
  const innerOffset =
    context.currentOffset +
    context.offset +
    (match.index ?? 0) +
    (type === "bold" || type === "delete" ? 2 : 1);

  return {
    type,
    children: context.parseInlineElements(innerContent, context.index, innerOffset),
    position: createPosition(match, context),
  };
}

/**
 * 查找最近的匹配 2
 * @param line 当前处理的行文本
 * @param offset 当前处理的偏移量
 * @returns 包含匹配类型和匹配结果的对象，若未找到匹配则返回 null
 */
function findNextMatch(line: string, offset: number) {
  let bestMatch: { type: string; match: RegExpMatchArray } | null = null;

  // 遍历所有 Markdown 模式
  for (const [type, pattern] of Object.entries(MARKDOWN_PATTERNS)) {
    // 从当前偏移量开始匹配
    const match = line.slice(offset).match(pattern.regex);
    // 如果未匹配到，继续下一个模式
    if (!match) continue;

    // 如果没有最佳匹配或者当前匹配的索引更小，则更新最佳匹配
    // ?? 是逻辑空值合并操作符。如果 match.index 为 null 或 undefined，则将其替换为 Infinity
    if (!bestMatch || (match.index ?? Infinity) < (bestMatch.match.index ?? Infinity)) {
      bestMatch = { type, match };
    }
  }

  return bestMatch;
}

/**
 * 解析内联元素（主元素） 1
 * @param line 当前处理的行文本
 * @param index 当前行的索引
 * @param currentOffset 当前的偏移量
 * @returns Tokens 数组
 */
export const parseInlineElements = (
  line: string,
  index: number,
  currentOffset: number,
): Tokens[] => {
  //行内索引
  let offset = 0;
  let children: Tokens[] = [];
  let lastIndex = 0;

  // 创建处理上下文
  const context: ProcessContext = {
    line,
    index,
    currentOffset,
    offset,
    parseInlineElements,
  };

  // 循环处理行文本，直到偏移量达到行文本长度
  while (offset < line.length) {
    // 查找下一个匹配
    const nextMatch = findNextMatch(line, offset);

    // 如果未找到匹配，跳出循环
    if (!nextMatch) break;

    const { type, match } = nextMatch;

    // 处理匹配前的文本
    if (match.index && match.index > 0) {
      children.push({
        type: "text",
        value: line.slice(offset, offset + match.index),
        position: {
          start: {
            line: index + 1,
            column: offset + 1,
            offset: currentOffset + offset,
          },
          end: {
            line: index + 1,
            column: offset + match.index + 1,
            offset: currentOffset + offset + match.index,
          },
        },
      });
    }

    // 处理匹配的标记
    context.offset = offset;
    children.push(MARKDOWN_PATTERNS[type].process(match, context));

    // 更新偏移量
    offset += (match.index ?? 0) + match[0].length;
    lastIndex = offset;
  }

  // 处理剩余文本
  if (lastIndex < line.length) {
    children.push({
      type: "text",
      value: line.slice(lastIndex),
      position: {
        start: {
          line: index + 1,
          column: lastIndex + 1,
          offset: currentOffset + lastIndex,
        },
        end: {
          line: index + 1,
          column: line.length + 1,
          offset: currentOffset + line.length,
        },
      },
    });
  }

  return children;
};