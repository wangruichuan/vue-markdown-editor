<script setup lang="ts">
import { ref, watch, watchEffect, onMounted, shallowRef } from 'vue';
import Toolbar from './components/Toolbar.vue';
import MonacoEditor from './components/MonacoEditor.vue';
import Preview from './components/Preview.vue';
import Footer from './components/Footer.vue';
import Contents from './components/Contents.vue';
import { parseMarkdown, astToHtml } from '@wangruichuan/markdown-ast-parser'
import type { EditorOptions, Editor } from './types/monaco-types.ts'
import type { ToolbarItem } from "./types/toolbar.ts";
import { darkTheme, NConfigProvider } from 'naive-ui'

// 定义 props 类型
export interface Props {
  modelValue?: string
  dark?: boolean
  options?: EditorOptions
  local?: boolean
  footer?: boolean
  toolbars?: { addTools?: ToolbarItem[]; excludeTools?: string[]; orderTools?: { type: string; order: number }[]; }
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  dark: false,
  local: true,
  footer: true
})
// 定义 emit 类型
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'onChange', value: string,editorInstance:Editor): void,
}>()

//全屏
const isFullscreen = ref<boolean>(false);
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

//编辑器的状态：只读，只写，读写
const editorState = ref<"onlyWrite" | "onlyRead" | "writeAndRead">("writeAndRead");
const editorStateChange = (state: string) => {
  if (state === "onlyWrite") {
    if (editorState.value !== "onlyWrite") {
      editorState.value = "onlyWrite";
    } else {
      editorState.value = "writeAndRead";
    }
  }
  if (state === "onlyRead") {
    if (editorState.value !== "onlyRead") {
      editorState.value = "onlyRead";
    } else {
      editorState.value = "writeAndRead";
    }
  }
};

//是否显示目录
const isShowContent = ref<boolean>(false);
const toggleShowContent = () => {
  isShowContent.value = !isShowContent.value;
}




const markdown = ref<string>(props.modelValue)

watch(markdown, (newValue) => {
  emit('update:modelValue', newValue);
  emit('onChange', newValue,editorRef.value!.getEditor());
  const ast = parseMarkdown(newValue!);
  rawHtml.value = astToHtml(ast);
  // //开启本地存储
  if (props.local) {
    localStorage.setItem('markdown-editor-content', markdown.value);
  }
})

const rawHtml = ref<string>()
const ast = parseMarkdown(markdown.value);
rawHtml.value = astToHtml(ast);


// 编辑器实例
const editorRef = ref<{
  getEditor: () => Editor
}>()

// 工具栏实例
const toolbarRef = ref<{
  registerHotKey: (editor: Editor) => void
} | null>

//目录组件实例
type ContentsType = InstanceType<typeof Contents>
const contentsRef = ref<ContentsType>()

//预览组件实例
type PreviewType = InstanceType<typeof Preview>
const previewRef = shallowRef<PreviewType>()




onMounted(() => {
  //拿到 editor 实例
  const editor: Editor = editorRef!.value!.getEditor();
  //监听 options 变化
  watchEffect(() => {
    editor.updateOptions({
      theme: props.dark ? 'vs-dark' : 'vs',
      lineNumbers: 'off',
      ...(props.options)
    })
  })
  //注册全局快捷键
// 原代码中 toolbarRef 未正确初始化，导致不能直接使用 .value，需要对其进行初始化
const toolbarRef = ref<{
  registerHotKey: (editor: Editor) => void
} | null>(null);
// 修改后的注册快捷键代码
if (toolbarRef.value) {
  toolbarRef.value.registerHotKey(editor);
}

  if (props.local && localStorage.getItem('markdown-editor-content')) {
    markdown.value = localStorage.getItem('markdown-editor-content') || '';
    emit('update:modelValue', markdown.value);
    const ast = parseMarkdown(markdown.value);
    rawHtml.value = astToHtml(ast);
  } else if (!props.local) {
    localStorage.removeItem('markdown-editor-content');
  }
})

const getEditorInstance = () => {
  return editorRef!.value!.getEditor();
}

const getCursorPosition = () => {
  const editor: Editor = getEditorInstance()
  return editor.getPosition();

}
//获取选中内容
const getSelection = () => {
  const editor: Editor = getEditorInstance()
  const selection = editor.getSelection();
  let text = "";
  if (selection) {
    text = editor.getModel()?.getValueInRange({
      startLineNumber: selection.startLineNumber,
      startColumn: selection.startColumn,
      endLineNumber: selection.endLineNumber,
      endColumn: selection.endColumn
    }) as string;
  }
  return text
}

//聚焦
const focus = () => {
  const editor: Editor = getEditorInstance()
  editor.focus()
}
//清空内容
const clear = () => {
  markdown.value = "";
}
//获取内容
const getContent = () => {
  return markdown.value
}
//切换目录
const toggleContent = () => {
  if (contentsRef.value) {
    contentsRef.value.generateTOC()
  }
}
// 获取预览组件实例
const getPreViewInstance = () => {
  return previewRef.value!.getPreViewInstance()
}




defineExpose({
  getEditorInstance,
  getPreViewInstance,
  getCursorPosition,
  getSelection,
  focus,
  clear,
  getContent,
})
</script>

<template>
  <div class="editor-container" :class="[{ 'dark-theme': props.dark }, { 'fullscreen': isFullscreen }]">
    <n-config-provider :theme="props.dark ? darkTheme : null" style="height: 100%">
      <Toolbar :editor="editorRef" ref="toolbarRef" :dark="props.dark"
               :toolbars="toolbars"
               @editorStateChange="editorStateChange"
        @toggleFullscreen="toggleFullscreen" @toggleShowContent="toggleShowContent"
        :getPreViewInstance="getPreViewInstance"></Toolbar>

      <div class="editor-wrapper" :style="{ height: props.footer ? 'calc(100% - 60px)' : 'calc(100% - 40px)' }">
        <div style="display: flex;" :style="{ width: isShowContent ? `80%` : `100%` }">
          <!-- 移除多余的 v-model 绑定，仅保留必要的绑定 -->
          <MonacoEditor @update:model-value="markdown = $event" v-show="editorState !== 'onlyRead'"
            :style="{ width: editorState === `onlyWrite` ? '100%' : '50%' }" v-bind="props" ref="editorRef">
          </MonacoEditor>
          <Preview :raw-html="rawHtml" v-show="editorState !== 'onlyWrite'"
            :style="{ width: editorState === `onlyRead` ? '100%' : '50%' }"
            :class="{ 'only-read': editorState === `onlyRead` }" @changeContents="() => {
    toggleContent()

  }" ref="previewRef">
            >
          </Preview>
        </div>
        <div class="contents" v-show="isShowContent">
          <Contents ref="contentsRef" :getPreViewInstance="getPreViewInstance"></Contents>
        </div>
      </div>
      <Footer :markdown="markdown" v-if="footer" :getEditorInstance="getEditorInstance"
        :getPreViewInstance="getPreViewInstance"></Footer>
    </n-config-provider>
  </div>


</template>

<style scoped>
.editor-container {
  border: 1px solid #ddd;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 500px;
  --background-color: white;
  --text-color: #000000;
  --border-color: #ddd;
  --quote-color: rgb(248, 248, 248);
  --h-color: rgb(63, 74, 84);
  --li-hover-back-color:rgb(227,227,227);
  --toolbar-background-color: rgb(250, 250, 250);
  --contents-background-color: #f6f8fa;
  background-color: var(--background-color);
  color: var(--text-color);
}

.dark-theme {
  /* 暗色主题变量 */
  --background-color: rgb(30, 30, 30);
  --quote-color: rgb(60, 59, 59);
  --text-color: white;
  --h-color: rgb(186, 198, 210);
  --border-color: rgb(45, 45, 45);
  --li-hover-back-color: rgb(85, 97, 116);
  --toolbar-background-color: rgb(30, 30, 30);
  --contents-background-color: rgb(44, 49, 60);
}

.editor-wrapper {
  display: flex;
  width: 100%;

}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.only-read {
  padding-left: 30%;
}

.editor-container .contents {
  width: 20%;
  overflow: auto;
  box-sizing: border-box;
  border-left: 1px solid var(--border-color);
}
</style>