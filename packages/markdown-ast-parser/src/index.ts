// 用于将 markdown 转换为 ast
export {parseMarkdown} from "./core/parse";
export {astToHtml} from './core/transform';

// ts 类型
export type {Tokens, RootTokens} from "./types/tokens";
export type {TokensTypes, TokensTypesKey, TokenTypeVal} from "./types/tokens-types";
export type {IncrementalParseOptions} from "./core/parse";