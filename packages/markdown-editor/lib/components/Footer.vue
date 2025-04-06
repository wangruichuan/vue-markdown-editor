<script setup lang="ts">
import {onMounted, ref,watch} from "vue";
import type { IDisposable } from 'monaco-editor';
import {NCheckbox,NButton} from 'naive-ui';

const scrollSync = ref(true);


const props = defineProps({
  markdown: {
    type: String,
    default: ""
  },
  getEditorInstance:{
    type: Function,
    default:()=>{}
  },
  getPreViewInstance:{
    type: Function,
    default:()=>{}
  }
})


const scrollTop = ()=>{
  props.getEditorInstance().revealLine(1)
}

// 存储滚动处理函数引用
let editorScrollHandler:IDisposable|null = null;
let previewScrollHandler: EventListenerOrEventListenerObject | null = null;
const startSyncScroll = ()=>{
  // 获取编辑区和预览区的 DOM 元素
  const editor =  props.getEditorInstance();
  const preview =  props.getPreViewInstance();



// 监听编辑区滚动事件（使用防抖）
// 存储是否正在手动滚动，避免循环触发
  let isScrolling = false;

  // 明确指定参数 e 的类型为 any 以解决隐式 any 类型的问题
  editorScrollHandler = editor.onDidScrollChange((e: any) => {
    if (isScrolling) return;

    isScrolling = true;

    // 获取编辑器滚动信息
    const scrollTop = e.scrollTop;
    const scrollHeight = editor.getScrollHeight();
    const editorHeight = editor.getLayoutInfo().height;

    // 计算滚动比例
    const scrollRatio = scrollTop / (scrollHeight - editorHeight);

    // 应用到预览区域
    const previewHeight = preview.scrollHeight - preview.clientHeight;
    preview.scrollTop = scrollRatio * previewHeight;

    isScrolling = false;
  });

  previewScrollHandler =() => {
    if (isScrolling) return;

    isScrolling = true;

    // 获取预览区域滚动信息
    const scrollTop = preview.scrollTop;
    const scrollHeight = preview.scrollHeight;
    const previewHeight = preview.clientHeight;

    // 计算滚动比例
    const scrollRatio = scrollTop / (scrollHeight - previewHeight);

    // 应用到编辑器
    const editorScrollHeight = editor.getScrollHeight();
    const editorHeight = editor.getLayoutInfo().height;
    editor.setScrollTop(scrollRatio * (editorScrollHeight - editorHeight));

    isScrolling = false;
  }

      preview.addEventListener('scroll', previewScrollHandler);


}
// 取消同步滚动
function disableSyncScroll() {
  const preview =  props.getPreViewInstance();
  // 移除Monaco编辑器滚动监听
  if (editorScrollHandler) {

    editorScrollHandler.dispose();
    editorScrollHandler = null;
  }

  // 移除预览区域滚动监听
  if (previewScrollHandler) {
    console.log("=>(Footer.vue:95) previewScrollHandler", previewScrollHandler);
    preview.removeEventListener('scroll', previewScrollHandler);
    previewScrollHandler = null;
  }
}
onMounted(()=>{
  watch(scrollSync, (newVal) => {

    if (newVal) {
      startSyncScroll()
    } else {
      disableSyncScroll()
    }
  }, { immediate: true }) // 立即执行一次以初始化状态
})
</script>

<template>
  <div class="footer">
    <div class="words">Words: {{ props.markdown.length }}</div>
    <div>
      <n-checkbox v-model:checked="scrollSync" >
        同步滚动
      </n-checkbox>
      <n-button text @click="scrollTop">
        回到顶部
      </n-button>
    </div>


  </div>
</template>

<style scoped>
.footer {
  height: 20px;
  border-top: 1px solid  var(--border-color);
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 20px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
</style>