---
layout: page
sidebar: false
aside: false
title: 在线体验
---
<template>
  <div style="height: 80vh; width: 80%;margin: 20px auto;">
    <component v-if="EditorComponent" :is="EditorComponent" :style="{border: isDarkMode ? '1px solid rgb(34,34,34)' : '1px solid #ddd'}" v-model="markdown" :dark="isDarkMode" />
  </div>
</template>

<script setup>
import "@wangruichuan/markdown-editor/dist/markdown-editor.css"
import { ref, onMounted, watchEffect } from 'vue'

const isDarkMode = ref(false);
const EditorComponent = ref(null);

const checkColorMode = () => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    isDarkMode.value = document.documentElement.classList.contains('dark');
  }
};

const markdown = ref("# Markdown 常见语法\n" +
    "\n" +
    "这是一个用于测试 **Markdown** 语法的文档。它包含了各种常见的 Markdown 元素。\n" +
    "\n" +
    "## 1. 标题\n" +
    "\n" +
    "# H1\n" +
    "\n" +
    "## H2\n" +
    "\n" +
    "### H3\n" +
    "\n" +
    "#### H4\n" +
    "\n" +
    "##### H5\n" +
    "\n" +
    "###### H6\n" +
    "\n" +
    "## 2. 文本样式\n" +
    "\n" +
    "- **粗体文本**\n" +
    "- *斜体文本*\n" +
    "- ~~删除线文本~~\n" +
    "- `行内代码`\n" +
    "\n" +
    "## 3. 列表\n" +
    "\n" +
    "### 无序列表\n" +
    "\n" +
    "- 项目一\n" +
    "  - 子项目\n" +
    "- 项目二\n" +
    "- 项目三\n" +
    "\n" +
    "### 有序列表\n" +
    "\n" +
    "1. 第一项\n" +
    "2. 第二项\n" +
    "3. 第三项\n" +
    "\n" +
    "\n" +
    "## 4. 链接和图片\n" +
    "\n" +
    "[GitHub](https://github.com) 链接示例\n" +
    "\n" +
    "![替代文本](https://picsum.photos/500/300)\n" +
    "![替代文本](https://picsum.photos/800/300)\n" +
    "![替代文本](https://picsum.photos/900/300)\n" +
    "\n" +
    "## 5. 代码块\n" +
    "\n" +
    "```python\n" +
    "def hello_world():\n" +
    "    print(\"Hello, Markdown!\")\n" +
    "```\n" +
    "\n" +
    "## 6.表格\n" +
    "\n" +
    "| 表头1 | 表头2 | 表头3 |\n" +
    "| ----- | ----- | ----- |\n" +
    "| 内容1 | 内容2 | 内容3 |\n" +
    "\n" +
    "## 7.引用\n" +
    "\n" +
    "> 引用一段内容\n" +
    "\n" +
    "## 8.分割线\n" +
    "\n" +
    "---");

onMounted(async () => {
  
    checkColorMode();
    const observer = new MutationObserver(checkColorMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    const { Editor } = await import('@wangruichuan/markdown-editor');
    EditorComponent.value = Editor;
    
});
</script>
