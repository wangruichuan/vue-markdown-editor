# vue-markdown-editor
`pnpm + monorepo` `TypeScript` `monaco-editor`
- markdown-ast-parser : markdown 解析器
- vue-markdown-editor : 基于 monaco-editor 的 vue 组件
- markdown-editor-doc : 基于 vue-markdown-editor 的 doc 文档

![预览图](https://pic1.imgdb.cn/item/67ffe28688c538a9b5d499d2.png) 

# 快速开始
- 文档地址：https://wangruichuan.github.io/vue-markdown-editor/online-experience.html

## 在线尝试
可以直接在 [在线尝试](https://wangruichuan.github.io/vue-markdown-editor/online-experience.html)  上进行在线尝试。

## 安装

```shell
npm install @wangruichuan/markdown-ast-parser
```

```shell
yarn add @wangruichuan/markdown-ast-parser
```
```shell
pnpm install @wangruichuan/markdown-ast-parser
```




## 使用
```vue
<script setup>
  import {Editor} from '@wangruichuan/markdown-editor'
  import "@wangruichuan/markdown-editor/dist/markdown-editor.css"
  import {ref} from 'vue'
  
  const markdown = ref("")
</script>

<template>

  <div style="height: 500px;" >
    <Editor
        v-model="markdown"
    />
  </div>

</template>

```


