<script setup lang="ts">
import '@/assets/demo.css'; // 引入外部 CSS 文件
import '@/assets/atom-one-dark.css'
import {onUpdated, ref} from "vue";
// 定义 props
defineProps({
  rawHtml: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['changeContents'])

const preViewRef = ref()
const getPreViewInstance = () => {
  return preViewRef.value;
}
defineExpose({
  getPreViewInstance
})

onUpdated(()=>{
  emit('changeContents')
})

</script>

<template>
  <div ref="preViewRef" class="preview" v-html="rawHtml"></div>
</template>

<style scoped>

.preview{
  overflow: auto;
  flex-grow: 1;
  padding: 0 10px;
  overflow-x: hidden; /* 禁止横向滚动 */
  font-size: 15px;
  line-height: 1.5;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}

</style>