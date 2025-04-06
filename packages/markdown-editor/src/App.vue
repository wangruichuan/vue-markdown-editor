<script setup lang="ts">
import Editor from '../lib/Editor.vue'
import {NButton} from 'naive-ui'
import {ref} from "vue";

import HelpIcon from "./assets/images/help.svg?raw"

const markdown = ref<string>("# Markdown 常见语法\n" +
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
const dark = ref<boolean>(false);
const options = ref({
  fontSize: 18
})

const editorRef = ref<typeof Editor | null>(null);


</script>

<template>
  <div class="container">
    <div style="height: 90vh;width: 90vw;">
      <div class="button-list">
        <n-button @click="dark = !dark">切换主题</n-button>
        <n-button @click="console.log(editorRef!.getEditorInstance())">获取预览区实例</n-button>
        <n-button @click="console.log(editorRef!.getPreViewInstance())">获取编辑区实例</n-button>
        <n-button @click="console.log(editorRef!.getCursorPosition())">获取光标位置</n-button>
        <n-button @click="console.log(editorRef!.getSelection())">获取选中内容</n-button>
        <n-button @click="editorRef!.focus()">聚焦</n-button>
        <n-button @click="editorRef!.clear()">清空内容</n-button>
        <n-button @click="console.log(editorRef!.getContent())">获取内容</n-button>
      </div>
      <Editor ref="editorRef"
              @on-change="(value,editorInstance)=>{
                console.log(`onChange事件触发`);
                console.log(value,editorInstance);
              }"
              v-model="markdown"
              :dark="dark"
              :options="options"
              :footer="true"
              :toolbars="{
            excludeTools:[],
            addTools:[
                {
                   type: 'custom-toolbar',
                   title:'自定义toolbar',
                   icon: HelpIcon,
                   hotkey:{
                      command:'Ctrl ALT B',
                      description:'自定义快捷键',
                      handle:()=>{
                        console.log(`我是自定义快捷键的输出，谢谢`)
                      }
                   },
                   onClick:()=>{
                     console.log(`我是自定义的输出`)
                   }
                }
            ],
            orderTools:[
                { type: `bold`, order: 1 },
                { type: `italic`, order: 2 },
                { type: `underline`, order: 3 },]
              }"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-list {
  width: 100%;
  display: flex;
  margin: 10px 0;
  gap: 10px
}
</style>
