import type { Tokens } from '@/types/tokens'
import type { ParseFnParams } from '..'
import { parseMarkdown } from '../..'

// 转换 blockquote
export const parseBlockquote = ({
  trimmedLine,
  line,
  index,
  currentOffset,
  root,
  currentStatus
}: ParseFnParams) => {
  // 引用内容
  if (trimmedLine.startsWith('>')) {
    const text = trimmedLine.slice(1).trim()

    if (!currentStatus.currentBlockquote) {
      currentStatus.currentBlockquote = {
        type: 'blockquote',
        children: [],
        position: {
          start: { line: index + 1, column: 1, offset: currentOffset },
          end: {
            line: index + 1,
            column: 3 + text.length,
            offset: currentOffset + 2 + text.length
          }
        }
      }
      root.children.push(currentStatus.currentBlockquote as Tokens)
    }

    // 递归解析 blockquote 内容
    const blockquoteContent = parseMarkdown(text)

    ;(currentStatus.currentBlockquote.children as Tokens[]).push(
      ...blockquoteContent.children
    )

    currentStatus.currentBlockquote.position.end = {
      line: index + 1,
      column: 3 + text.length,
      offset: currentOffset + 2 + text.length
    }
    return true
  }
  else if (currentStatus.currentBlockquote) {
    currentStatus.currentBlockquote = null
    return false
  }
}
