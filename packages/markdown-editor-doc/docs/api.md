# API
## Props
::: tip
`Editor` 组件基于 Monaco 实现，支持所有 Monaco 的原生配置选项，并进行了功能扩展。
本文档中仅列出了扩展属性和部分常用配置，如需了解全部配置选项，请查阅 [Monaco 官方文档](https://microsoft.github.io/monaco-editor/)。
:::
### model-value/v-model
用于绑定markdown内容
- 类型：`string`
- 默认值: `""`
### options
- monaco-editor原生选项配置。
- 类型：[`monaco.editor.IStandaloneEditorConstructionOptions`](/monaco)
- 默认值:`undefined`
```vue
<script setup>
  const options = ref({
    fontSize: 18,
    //....
  })
</script> 
<template>
  <Editor :options="options"/>
</template>
```

### toolbars
- 类型：`{ addTools?: ToolbarItem[]; excludeTools?: string[]; orderTools?: { type: string; order: number }[]; }`
  - addTools：可以自定义新增 toolbar 配置项
  - excludeTools：需要过滤工具项的 toolbar 数组配置项
  - orderTools: 排序 toolbar 中工具项先后顺序的数组配置项
- 默认值：`undefined`

**工具栏项接口定义：**
```ts
// 基础工具栏项接口
export interface BaseToolbarItem {
  type: ToolbarType;
  icon?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
}

// 工具栏列表项接口
export interface ToolbarItemListItem {
  title?: string;
  type: string;
  hotkey?: {
    command: string;
    description: string;
    handle?: () => void;
  };
  onClick?: (...args: any[]) => void | (() => void);

}

// 完整的工具栏项接口
export interface ToolbarItem extends BaseToolbarItem {
  list?: ToolbarItemListItem[];
  hotkey?: {
    command: string;
    description: string;
    handle?: () => void;
  };
  order?: number;
}
```

#### 1.移除工具栏
> [!WARNING]
> 只能移除已存在的工具栏项
```vue{2}
<Editor :toolbars="{
    excludeTools:['bold','underline']
    }"
/>
```
#### 2.新增工具栏
```vue
<script setup>
  // 因为 icon 属性需要的是 字符串，所以导入路径的时候需要使用 `?raw`
  /**
   * 尽量将 svg 的 width、height 设置为 1em
   * <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"></svg>
   */
import HelpIcon from "@/assets/images/help.svg?raw";
</script>
<template>
  <Editor :toolbars="{
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
            ]}"
  />
</template>
```

#### 3.工具类排序
> 只对 orderTools 中配置的工具项进行排序，未配置的工具项不受影响。

[工具类类型](/toolbar-type)
```vue
<Editor :toolbars="{
            orderTools:[
                { type: `bold`, order: 1 },
                { type: `italic`, order: 2 },
                { type: `underline`, order: 3 }]
    }"
/>
```
### dark
是否切换为黑暗模式
- 类型：`boolean`
- 默认值：`false`
### local
是否开启本地存储，默认开启
> localStorage 存储的 key 为 `markdown-editor-content`

- 类型：`boolean`
- 默认值：`true`
### footer
是否开启底栏，默认开启
- 类型：`boolean`
- 默认值：`true`
## Emits
### onChange
编辑器内容变化时触发。
- 类型：`(value: string, editorInstance: monaco.editor.IStandaloneCodeEditor ) => void`
  - `value`：改变后的值
  - `editorInstance`: 编辑器实例
- 示例
```vue
<Editor ref="editorRef"
        @on-change="(value,editorInstance)=>{
          console.log(`onChange事件触发`);
          console.log(value,editorInstance);
        }" />
```
### onDragUpload
编辑器内容变化时触发

`under constrution`
### onPatseUpload
粘贴上传图片时触发

`under constrution`
## Exposes
### getContent
获取编辑器内容
- 类型：`() => string`

```vue{3,5,9}
<script setup>
  import {onMounted} from "vue";
  const editorRef = ref(null);
  onMounted(()=>{
      console.log(editorRef.getContent)
  })
</script>
<template>
  <Editor ref="editorRef"
          v-model="markdown"/>
</template> 
```
### getEditorInstance
获取编辑器实例
- 类型：`() => monaco.editor.IStandaloneCodeEditor`

### getPreViewInstance
获取预览区实例
- 类型：`() => HTMLElement`

### getCursorPosition
获取Cursor位置
- 类型：`() => editor.IEditor`

### getSelection
获取选中内容
- 类型：`() => string`

### focus
聚焦
- 类型：`() => void`

### clear
清空编辑区
- 类型：`() => void`

