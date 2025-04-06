# Monaco原生配置项

## 类型
```typescript
interface IStandaloneEditorConstructionOptions {
    acceptSuggestionOnCommitCharacter?: boolean;
    acceptSuggestionOnEnter?: "off" | "on" | "smart";
    accessibilityHelpUrl?: string;
    accessibilityPageSize?: number;
    accessibilitySupport?: "off" | "on" | "auto";
    ariaContainerElement?: HTMLElement;
    ariaLabel?: string;
    ariaRequired?: boolean;
    autoClosingBrackets?: EditorAutoClosingStrategy;
    autoClosingComments?: EditorAutoClosingStrategy;
    autoClosingDelete?: EditorAutoClosingEditStrategy;
    autoClosingOvertype?: EditorAutoClosingEditStrategy;
    autoClosingQuotes?: EditorAutoClosingStrategy;
    autoDetectHighContrast?: boolean;
    autoIndent?: "none" | "advanced" | "full" | "brackets" | "keep";
    autoSurround?: EditorAutoSurroundStrategy;
    automaticLayout?: boolean;
    bracketPairColorization?: IBracketPairColorizationOptions;
    codeActionsOnSaveTimeout?: number;
    codeLens?: boolean;
    codeLensFontFamily?: string;
    codeLensFontSize?: number;
    colorDecorators?: boolean;
    colorDecoratorsActivatedOn?: "clickAndHover" | "click" | "hover";
    colorDecoratorsLimit?: number;
    columnSelection?: boolean;
    comments?: IEditorCommentsOptions;
    contextmenu?: boolean;
    copyWithSyntaxHighlighting?: boolean;
    cursorBlinking?: "blink" | "smooth" | "phase" | "expand" | "solid";
    cursorSmoothCaretAnimation?: "off" | "on" | "explicit";
    cursorStyle?: "line" | "block" | "underline" | "line-thin" | "block-outline" | "underline-thin";
    cursorSurroundingLines?: number;
    cursorSurroundingLinesStyle?: "default" | "all";
    cursorWidth?: number;
    defaultColorDecorators?: boolean;
    definitionLinkOpensInPeek?: boolean;
    detectIndentation?: boolean;
    dimension?: IDimension;
    disableLayerHinting?: boolean;
    disableMonospaceOptimizations?: boolean;
    domReadOnly?: boolean;
    dragAndDrop?: boolean;
    dropIntoEditor?: IDropIntoEditorOptions;
    emptySelectionClipboard?: boolean;
    experimentalInlineEdit?: IInlineEditOptions;
    experimentalWhitespaceRendering?: "off" | "svg" | "font";
    extraEditorClassName?: string;
    fastScrollSensitivity?: number;
    find?: IEditorFindOptions;
    fixedOverflowWidgets?: boolean;
    folding?: boolean;
    foldingHighlight?: boolean;
    foldingImportsByDefault?: boolean;
    foldingMaximumRegions?: number;
    foldingStrategy?: "auto" | "indentation";
    fontFamily?: string;
    fontLigatures?: string | boolean;
    fontSize?: number;
    fontVariations?: string | boolean;
    fontWeight?: string;
    formatOnPaste?: boolean;
    formatOnType?: boolean;
    glyphMargin?: boolean;
    gotoLocation?: IGotoLocationOptions;
    guides?: IGuidesOptions;
    hideCursorInOverviewRuler?: boolean;
    hover?: IEditorHoverOptions;
    inDiffEditor?: boolean;
    inlayHints?: IEditorInlayHintsOptions;
    inlineCompletionsAccessibilityVerbose?: boolean;
    inlineSuggest?: IInlineSuggestOptions;
    insertSpaces?: boolean;
    language?: string;
    largeFileOptimizations?: boolean;
    letterSpacing?: number;
    lightbulb?: IEditorLightbulbOptions;
    lineDecorationsWidth?: string | number;
    lineHeight?: number;
    lineNumbers?: LineNumbersType;
    lineNumbersMinChars?: number;
    linkedEditing?: boolean;
    links?: boolean;
    matchBrackets?: "always" | "never" | "near";
    matchOnWordStartOnly?: boolean;
    maxTokenizationLineLength?: number;
    minimap?: IEditorMinimapOptions;
    model?: ITextModel;
    mouseStyle?: "default" | "text" | "copy";
    mouseWheelScrollSensitivity?: number;
    mouseWheelZoom?: boolean;
    multiCursorLimit?: number;
    multiCursorMergeOverlapping?: boolean;
    multiCursorModifier?: "ctrlCmd" | "alt";
    multiCursorPaste?: "spread" | "full";
    occurrencesHighlight?: "off" | "singleFile" | "multiFile";
    overflowWidgetsDomNode?: HTMLElement;
    overviewRulerBorder?: boolean;
    overviewRulerLanes?: number;
    padding?: IEditorPaddingOptions;
    parameterHints?: IEditorParameterHintOptions;
    pasteAs?: IPasteAsOptions;
    peekWidgetDefaultFocus?: "tree" | "editor";
    quickSuggestions?: boolean | IQuickSuggestionsOptions;
    quickSuggestionsDelay?: number;
    readOnly?: boolean;
    readOnlyMessage?: IMarkdownString;
    renameOnType?: boolean;
    renderControlCharacters?: boolean;
    renderFinalNewline?: "off" | "on" | "dimmed";
    renderLineHighlight?: "all" | "line" | "none" | "gutter";
    renderLineHighlightOnlyWhenFocus?: boolean;
    renderValidationDecorations?: "off" | "on" | "editable";
    renderWhitespace?: "all" | "none" | "boundary" | "selection" | "trailing";
    revealHorizontalRightPadding?: number;
    roundedSelection?: boolean;
    rulers?: (number | IRulerOption)[];
    screenReaderAnnounceInlineSuggestion?: boolean;
    scrollBeyondLastColumn?: number;
    scrollBeyondLastLine?: boolean;
    scrollPredominantAxis?: boolean;
    scrollbar?: IEditorScrollbarOptions;
    selectOnLineNumbers?: boolean;
    selectionClipboard?: boolean;
    selectionHighlight?: boolean;
    semanticHighlighting.enabled?: boolean | "configuredByTheme";
    showDeprecated?: boolean;
    showFoldingControls?: "always" | "never" | "mouseover";
    showUnused?: boolean;
    smartSelect?: ISmartSelectOptions;
    smoothScrolling?: boolean;
    snippetSuggestions?: "none" | "top" | "bottom" | "inline";
    stablePeek?: boolean;
    stickyScroll?: IEditorStickyScrollOptions;
    stickyTabStops?: boolean;
    stopRenderingLineAfter?: number;
    suggest?: ISuggestOptions;
    suggestFontSize?: number;
    suggestLineHeight?: number;
    suggestOnTriggerCharacters?: boolean;
    suggestSelection?: "first" | "recentlyUsed" | "recentlyUsedByPrefix";
    tabCompletion?: "off" | "on" | "onlySnippets";
    tabFocusMode?: boolean;
    tabIndex?: number;
    tabSize?: number;
    theme?: string;
    trimAutoWhitespace?: boolean;
    unfoldOnClickAfterEndOfLine?: boolean;
    unicodeHighlight?: IUnicodeHighlightOptions;
    unusualLineTerminators?: "off" | "auto" | "prompt";
    useShadowDOM?: boolean;
    useTabStops?: boolean;
    value?: string;
    wordBasedSuggestions?: "off" | "currentDocument" | "matchingDocuments" | "allDocuments";
    wordBasedSuggestionsOnlySameLanguage?: boolean;
    wordBreak?: "normal" | "keepAll";
    wordSegmenterLocales?: string | string[];
    wordSeparators?: string;
    wordWrap?: "off" | "on" | "wordWrapColumn" | "bounded";
    wordWrapBreakAfterCharacters?: string;
    wordWrapBreakBeforeCharacters?: string;
    wordWrapColumn?: number;
    wordWrapOverride1?: "off" | "on" | "inherit";
    wordWrapOverride2?: "off" | "on" | "inherit";
    wrappingIndent?: "none" | "same" | "indent" | "deepIndent";
    wrappingStrategy?: "simple" | "advanced";
}
```

---

### **基本配置**

• **acceptSuggestionOnCommitCharacter**: 是否在输入提交字符时接受建议（如 `Tab` 或 `Enter`）。  
• **acceptSuggestionOnEnter**: 控制按下 `Enter` 键时是否接受建议，可选值：`"off"`、`"on"`、`"smart"`。  
• **accessibilityHelpUrl**: 辅助功能帮助页面的 URL。  
• **accessibilityPageSize**: 辅助功能模式下，页面滚动的行数。  
• **accessibilitySupport**: 是否启用辅助功能支持，可选值：`"off"`、`"on"`、`"auto"`。  
• **ariaContainerElement**: 用于辅助功能的容器元素。  
• **ariaLabel**: 编辑器的 ARIA 标签。  
• **ariaRequired**: 是否将编辑器标记为 ARIA 必填项。  
• **autoDetectHighContrast**: 是否自动检测高对比度模式。  
• **automaticLayout**: 是否自动调整编辑器布局。  
• **dimension**: 编辑器的尺寸（宽度和高度）。  
• **domReadOnly**: 是否将编辑器设置为只读模式（DOM 级别）。  
• **extraEditorClassName**: 为编辑器添加额外的 CSS 类名。  
• **inDiffEditor**: 是否在差异编辑器中使用。  
• **language**: 编辑器的语言模式（如 `javascript`、`typescript`）。  
• **model**: 关联的文本模型（`ITextModel`）。  
• **readOnly**: 是否将编辑器设置为只读模式。  
• **readOnlyMessage**: 只读模式下显示的提示信息（Markdown 格式）。  
• **theme**: 编辑器的主题（如 `vs`、`vs-dark`、`hc-black`）。  
• **useShadowDOM**: 是否使用 Shadow DOM 渲染编辑器。  
• **value**: 编辑器的初始内容。

---

### **光标与选择**

• **cursorBlinking**: 光标闪烁效果，可选值：`"blink"`、`"smooth"`、`"phase"`、`"expand"`、`"solid"`。  
• **cursorSmoothCaretAnimation**: 是否启用光标平滑动画，可选值：`"off"`、`"on"`、`"explicit"`。  
• **cursorStyle**: 光标样式，可选值：`"line"`、`"block"`、`"underline"`、`"line-thin"`、`"block-outline"`、`"underline-thin"`。  
• **cursorSurroundingLines**: 光标周围保留的行数。  
• **cursorSurroundingLinesStyle**: 光标周围行的样式，可选值：`"default"`、`"all"`。  
• **cursorWidth**: 光标的宽度。  
• **multiCursorLimit**: 多光标的最大数量。  
• **multiCursorMergeOverlapping**: 是否合并重叠的多光标。  
• **multiCursorModifier**: 多光标的修饰键，可选值：`"ctrlCmd"`、`"alt"`。  
• **multiCursorPaste**: 多光标粘贴行为，可选值：`"spread"`、`"full"`。  
• **roundedSelection**: 是否将选择区域圆角化。  
• **selectOnLineNumbers**: 是否在点击行号时选择整行。  
• **selectionClipboard**: 是否将选择内容复制到剪贴板。  
• **selectionHighlight**: 是否高亮显示所有匹配的选中内容。

---

### **文本与格式**

• **autoClosingBrackets**: 自动闭合括号的策略。  
• **autoClosingComments**: 自动闭合注释的策略。  
• **autoClosingDelete**: 自动删除闭合字符的策略。  
• **autoClosingOvertype**: 自动覆盖闭合字符的策略。  
• **autoClosingQuotes**: 自动闭合引号的策略。  
• **autoIndent**: 自动缩进策略，可选值：`"none"`、`"advanced"`、`"full"`、`"brackets"`、`"keep"`。  
• **autoSurround**: 自动包围字符的策略。  
• **bracketPairColorization**: 括号对颜色化选项。  
• **detectIndentation**: 是否自动检测缩进。  
• **insertSpaces**: 是否使用空格代替 Tab。  
• **matchBrackets**: 是否高亮匹配的括号，可选值：`"always"`、`"never"`、`"near"`。  
• **matchOnWordStartOnly**: 是否仅在单词开头匹配。  
• **renderControlCharacters**: 是否渲染控制字符。  
• **renderFinalNewline**: 是否渲染最后的换行符，可选值：`"off"`、`"on"`、`"dimmed"`。  
• **renderWhitespace**: 是否渲染空白字符，可选值：`"all"`、`"none"`、`"boundary"`、`"selection"`、`"trailing"`。  
• **tabSize**: Tab 的空格数。  
• **trimAutoWhitespace**: 是否自动修剪空白字符。  
• **unusualLineTerminators**: 处理非常规行终止符的策略，可选值：`"off"`、`"auto"`、`"prompt"`。  
• **useTabStops**: 是否使用 Tab 停靠点。

---

### **滚动与布局**

• **scrollBeyondLastColumn**: 允许滚动超出最后一列的字符数。  
• **scrollBeyondLastLine**: 是否允许滚动超出最后一行。  
• **scrollPredominantAxis**: 是否以主要轴方向滚动。  
• **scrollbar**: 滚动条的配置选项。  
• **wordWrap**: 文本换行策略，可选值：`"off"`、`"on"`、`"wordWrapColumn"`、`"bounded"`。  
• **wordWrapColumn**: 文本换行的列数。  
• **wordWrapOverride1**: 第一级文本换行覆盖策略。  
• **wordWrapOverride2**: 第二级文本换行覆盖策略。  
• **wrappingIndent**: 换行后的缩进策略，可选值：`"none"`、`"same"`、`"indent"`、`"deepIndent"`。  
• **wrappingStrategy**: 换行策略，可选值：`"simple"`、`"advanced"`。

---

### **辅助功能**

• **ariaContainerElement**: 用于辅助功能的容器元素。  
• **ariaLabel**: 编辑器的 ARIA 标签。  
• **ariaRequired**: 是否将编辑器标记为 ARIA 必填项。  
• **screenReaderAnnounceInlineSuggestion**: 是否向屏幕阅读器宣布内联建议。

---

### **其他**

• **codeLens**: 是否显示 CodeLens。  
• **colorDecorators**: 是否启用颜色装饰器。  
• **find**: 查找功能的配置选项。  
• **folding**: 是否启用代码折叠。  
• **fontFamily**: 字体家族。  
• **fontSize**: 字体大小。  
• **fontLigatures**: 是否启用字体连字。  
• **fontVariations**: 字体变体。  
• **fontWeight**: 字体粗细。  
• **glyphMargin**: 是否显示字形边距。  
• **hover**: 悬停提示的配置选项。  
• **lightbulb**: 灯泡提示的配置选项。  
• **lineNumbers**: 行号显示方式。  
• **minimap**: 缩略图的配置选项。  
• **parameterHints**: 参数提示的配置选项。  
• **quickSuggestions**: 是否启用快速建议。  
• **snippetSuggestions**: 代码片段建议的显示位置，可选值：`"none"`、`"top"`、`"bottom"`、`"inline"`。  
• **suggest**: 建议功能的配置选项。  
• **tabCompletion**: Tab 补全策略，可选值：`"off"`、`"on"`、`"onlySnippets"`。  
• **tabFocusMode**: 是否启用 Tab 焦点模式。  
• **tabIndex**: 编辑器的 Tab 索引。

---

### **实验性功能**

• **experimentalInlineEdit**: 内联编辑的实验性选项。  
• **experimentalWhitespaceRendering**: 空白字符渲染的实验性选项。  
• **inlineCompletionsAccessibilityVerbose**: 内联建议的辅助功能详细模式。  
• **inlineSuggest**: 内联建议的配置选项。  
• **stickyScroll**: 粘性滚动的配置选项。

---

### **未分类**

• **columnSelection**: 是否启用列选择。  
• **copyWithSyntaxHighlighting**: 复制时是否保留语法高亮。  
• **defaultColorDecorators**: 是否默认启用颜色装饰器。  
• **definitionLinkOpensInPeek**: 定义链接是否在 Peek 视图中打开。  
• **disableLayerHinting**: 是否禁用图层提示。  
• **disableMonospaceOptimizations**: 是否禁用等宽字体优化。  
• **dragAndDrop**: 是否启用拖放功能。  
• **dropIntoEditor**: 拖放内容的配置选项。  
• **emptySelectionClipboard**: 是否允许空选择复制到剪贴板。  
• **fastScrollSensitivity**: 快速滚动的灵敏度。  
• **fixedOverflowWidgets**: 是否固定溢出的小部件。  
• **foldingHighlight**: 是否高亮折叠区域。  
• **foldingImportsByDefault**: 是否默认折叠导入语句。  
• **foldingMaximumRegions**: 最大折叠区域数。  
• **foldingStrategy**: 折叠策略，可选值：`"auto"`、`"indentation"`。  
• **gotoLocation**: 跳转到位置的配置选项。  
• **guides**: 参考线的配置选项。  
• **hideCursorInOverviewRuler**: 是否在概览标尺中隐藏光标。  
• **inlayHints**: 内联提示的配置选项。  
• **largeFileOptimizations**: 是否启用大文件优化。  
• **letterSpacing**: 字母间距。  
• **lineDecorationsWidth**: 行装饰的宽度。  
• **lineHeight**: 行高。  
• **lineNumbersMinChars**: 行号的最小字符数。  
• **linkedEditing**: 是否启用链接编辑。  
• **links**: 是否启用链接。  
• **maxTokenizationLineLength**: 最大词法分析行长度。  
• **mouseStyle**: 鼠标样式，可选值：`"default"`、`"text"`、`"copy"`。  
• **mouseWheelScrollSensitivity**: 鼠标滚轮滚动的灵敏度。  
• **mouseWheelZoom**: 是否启用鼠标滚轮缩放。  
• **occurrencesHighlight**: 是否高亮匹配项，可选值：`"off"`、`"singleFile"`、`"multiFile"`。  
• **overflowWidgetsDomNode**: 溢出小部件的 DOM 节点。  
• **overviewRulerBorder**: 是否显示概览标尺边框。  
• **overviewRulerLanes**: 概览标尺的通道数。  
• **padding**: 编辑器的内边距。  
• **pasteAs**: 粘贴内容的配置选项。  
• **peekWidgetDefaultFocus**: Peek 视图的默认焦点，可选值：`"tree"`、`"editor"`。  
• **quickSuggestionsDelay**: 快速建议的延迟时间。  
• **renameOnType**: 是否在输入时重命名。  
• **renderLineHighlight**: 行高亮的渲染方式，可选值：`"all"`、`"line"`、`"none"`、`"gutter"`。  
• **renderLineHighlightOnlyWhenFocus**: 是否仅在焦点时渲染行高亮。  
• **renderValidationDecorations**: 验证装饰的渲染方式，可选值：`"off"`、`"on"`、`"editable"`。  
• **revealHorizontalRightPadding**: 水平滚动时右侧的填充。  
• **rulers**: 标尺的位置和配置。  
• **semanticHighlighting.enabled**: 是否启用语义高亮，可选值：`true`、`false`、`"configuredByTheme"`。  
• **showDeprecated**: 是否显示已弃用的内容。  
• **showFoldingControls**: 折叠控件的显示方式，可选值：`"always"`、`"never"`、`"mouseover"`。  
• **showUnused**: 是否显示未使用的内容。  
• **smartSelect**: 智能选择的配置选项。  
• **smoothScrolling**: 是否启用平滑滚动。  
• **stablePeek**: 是否稳定 Peek 视图。  
• **stickyTabStops**: 是否启用粘性 Tab 停靠点。  
• **stopRenderingLineAfter**: 停止渲染的行数。  
• **suggestFontSize**: 建议的字体大小。  
• **suggestLineHeight**: 建议的行高。  
• **suggestOnTriggerCharacters**: 是否在触发字符时显示建议。  
• **suggestSelection**: 建议的选择方式，可选值：`"first"`、`"recentlyUsed"`、`"recentlyUsedByPrefix"`。  
• **tabFocusMode**: 是否启用 Tab 焦点模式。  
• **unicodeHighlight**: Unicode 高亮的配置选项。  
• **wordBasedSuggestions**: 基于单词的建议策略，可选值：`"off"`、`"currentDocument"`、`"matchingDocuments"`、`"allDocuments"`。  
• **wordBasedSuggestionsOnlySameLanguage**: 是否仅在同一语言中提供基于单词的建议。  
• **wordBreak**: 单词断字策略，可选值：`"normal"`、`"keepAll"`。  
• **wordSegmenterLocales**: 单词分段器的区域设置。  
• **wordSeparators**: 单词分隔符。

---

以上是 `IStandaloneEditorConstructionOptions` 接口中所有配置选项的详细解释。这些选项可以帮助你高度定制 Monaco Editor 的行为和外观。

