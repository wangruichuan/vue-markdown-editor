# 快速开始
## 在线尝试
可以直接在 [在线尝试](/online-experience)  上进行在线尝试。

## 安装
::: code-group

```shell [npm]
npm install @wangruichuan/markdown-ast-parser
```

```shell [yarn]
yarn add @wangruichuan/markdown-ast-parser
```
```shell [pnpm]
pnpm install @wangruichuan/markdown-ast-parser
```


:::


## 使用
```vue{6}
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


