<script setup lang="ts">

import {nextTick, onMounted, ref} from "vue";

const props = defineProps(['getPreViewInstance'])
//目录的html
const rawContentsHtml = ref<string>("");
//生成目录的html
function generateTOC() {

  const preViewInstance = props.getPreViewInstance()
  const headings = preViewInstance.querySelectorAll('h1, h2, h3, h4, h5, h6');

  if (headings.length === 0) {
    rawContentsHtml.value = ''
    return
  }

  let tocHTML = '<ul>';
  let currentLevel = 1;

  headings.forEach((heading: HTMLElement, index: number) => {
    const level = parseInt(heading.tagName.substring(1));
    const id = heading.id || `heading-${index}`;
    heading.id = id;

    if (level > currentLevel) {
      tocHTML += '<ul>'.repeat(level - currentLevel);
    } else if (level < currentLevel) {
      tocHTML += '</ul>'.repeat(currentLevel - level);
    }

    currentLevel = level;
    tocHTML += `<li><a href="#${id}">${heading.textContent}</a></li>`;
  });

  tocHTML += '</ul>'.repeat(currentLevel - 1) + '</ul>';

  rawContentsHtml.value = tocHTML;
  init()
}

//toc组件实例
const tocRef = ref(null);
//高亮显示
function highlight(id:string){
  if(tocRef.value){
    const toc:HTMLElement = tocRef.value;
    toc.querySelectorAll('a.highlight')
        .forEach(a => {
          a.classList.remove('highlight')
        });
    toc.querySelector(`a[href="#${id}"]`)!.classList.add('highlight');


  }
}
function init(){
  if(tocRef.value){
    const toc:HTMLElement = tocRef.value;
    const preViewInstance:HTMLElement = props.getPreViewInstance()
    const titles:HTMLAnchorElement[] = []
    nextTick(()=>{
      const links: NodeListOf<HTMLAnchorElement> = toc.querySelectorAll(`a[href^="#"]`);
      for(const link of links){
        const url = new URL(link.href as string);
        const id = url.hash.slice(1); // "heading-0" (去掉开头的#)
        link.addEventListener("click", () => highlight(id));
        const dom = preViewInstance.querySelector(url.hash) as HTMLAnchorElement
        if(dom){
          titles.push(dom);
        }
      }
      const scrollHandler = () =>{
        const rects = titles.map((title)=> title.getBoundingClientRect() );
        const range = 300;
        for(let i = 0; i < rects.length; i++) {
          const title = titles[i];
          const rect =  rects[i]
          if(rect.top >= 0 && rect.top <=range){
            highlight(title.id)
            break
          }
        }
      }
      preViewInstance.addEventListener("scroll",scrollHandler)
    })
  }
}
defineExpose({
  generateTOC
})
onMounted(()=>{
  generateTOC()

})

</script>

<template>
<div class="toc" ref="tocRef"
     v-html="rawContentsHtml" contents-v-dasd78as415></div>
</template>

<style>
.toc[contents-v-dasd78as415]{
  width: 100%;
  overflow-y: auto;
  font-size: 15px;
  margin-left: -1em;
}
.toc[contents-v-dasd78as415] ul{
  list-style: none;
  margin: 0;
  padding-left: 2em;

}
.toc[contents-v-dasd78as415] li{
  margin: 5px 0 ;

}
.toc[contents-v-dasd78as415] a{
  text-decoration: none;
  color: var(--text-color);
  display: block;
  width: 100%;

}
.toc[contents-v-dasd78as415] a:hover {
  color: rgb(0, 0, 255);

}
.toc[contents-v-dasd78as415] .highlight{
  color: rgb(0, 0, 255);
  font-weight: bold;
}
</style>