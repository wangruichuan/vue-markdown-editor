import type * as monaco from 'monaco-editor' //monaco 是一个类型命名空间

// 暴露常用类型
export type Editor = monaco.editor.IStandaloneCodeEditor
export type EditorOptions = monaco.editor.IStandaloneEditorConstructionOptions