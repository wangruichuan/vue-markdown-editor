<template>
  <div ref="monacoContainer" class="monaco-editor"></div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch, onBeforeUnmount, shallowRef} from 'vue';
import * as monaco from 'monaco-editor';
import type {Editor} from '../types/monaco-types.ts'


const props = defineProps(['modelValue','dark']);
const emit = defineEmits(['update:modelValue']);

const monacoContainer = ref<HTMLElement | null>(null);

//编辑器对象
const editor = shallowRef<Editor | null>(null);

onMounted(() => {
  if (monacoContainer.value) {
    editor.value = monaco.editor.create(monacoContainer.value, {
      value:props.modelValue,
      language: 'markdown',
      theme: props.dark ? 'vs-dark' : 'vs',
      minimap: {
        enabled: false // 关闭小地图
      },
      automaticLayout: true,
      fontSize: 15,
      scrollbar: {
        vertical: 'auto', // 垂直滚动条：'auto'（默认）、'visible'、'hidden'
        horizontal: 'auto', // 水平滚动条：'auto'（默认）、'visible'、'hidden'
        arrowSize: 10, // 滚动条箭头的大小
        handleMouseWheel: true, // 是否启用鼠标滚轮滚动
        useShadows: false, // 是否使用阴影效果
        verticalScrollbarSize: 10, // 垂直滚动条的宽度
        horizontalScrollbarSize: 10, // 水平滚动条的高度
        verticalHasArrows: false, // 垂直滚动条是否显示箭头
        horizontalHasArrows: false, // 水平滚动条是否显示箭头
      },
      wordWrap:"on",
      ...props
    });
    //注册事件：当model content 改变时
    editor.value.onDidChangeModelContent(() => {
      const value = editor.value?.getValue() || '';
      emit('update:modelValue', value);
    });
    // 光标置最后
    // 获取编辑器内容的行数
    const lineCount = editor.value.getModel()!.getLineCount();
    // 获取最后一行的长度
    const lastLineLength = editor.value.getModel()!.getLineLength(lineCount);
    // 将光标移动到文本的最后位置
    editor.value.setPosition({
      lineNumber: lineCount,
      column: lastLineLength + 1
    });
    editor.value.focus();

  }
});

watch(() => props.modelValue, (newValue) => {
  if (editor.value && editor.value.getValue() !== newValue) {
    editor.value.setValue(newValue);
  }
});

// 销毁编辑器
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.dispose();
  }
});

const getEditor = () =>{
  return editor.value;
}

// 将editor实例给暴露出去
defineExpose({
  getEditor
})

</script>

<style scoped>
.monaco-editor {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  outline: none;
}
</style>