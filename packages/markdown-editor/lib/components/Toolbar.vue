<script setup lang="ts">
import { BaseToolbarType, type ToolbarItem } from '../types/toolbar.ts'
import { NDropdown, NPopover, NText } from 'naive-ui'
import { stringToKeybinding } from '../common/hotkey.ts'
import { ref } from "vue";
//@ts-ignore
import html2pdf from 'html2pdf.js';

import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";

//@ts-ignore
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import type {DropdownMixedOption} from "naive-ui/es/dropdown/src/interface";


import type { Editor } from '../types/monaco-types.ts';

//导入icon
import HeadingIcon from '@/assets/images/heading.svg?raw'
import BoldIcon from '@/assets/images/bold.svg?raw'
import ItalicIcon from '@/assets/images/italic.svg?raw'
import UnderlineIcon from '@/assets/images/underline.svg?raw'
import DeleteIcon from '@/assets/images/delete.svg?raw'
import BlockquoteIcon from '@/assets/images/blockquote.svg?raw'
import UlIcon from '@/assets/images/ul.svg?raw'
import OlIcon from '@/assets/images/ol.svg?raw'
import InlineCodeIcon from '@/assets/images/inlinecode.svg?raw'
import CodeIcon from '@/assets/images/code.svg?raw'
import LinkIcon from '@/assets/images/link.svg?raw'
import ImageIcon from '@/assets/images/image.svg?raw'
import TableIcon from '@/assets/images/table.svg?raw'
import EmojiIcon from '@/assets/images/emoji.svg?raw'
import FullscreenIcon from '@/assets/images/fullscreen.svg?raw'
import WriteIcon from '@/assets/images/write.svg?raw'
import PreViewIcon from '@/assets/images/preview.svg?raw'
import ContentsIcon from '@/assets/images/contents.svg?raw'
import OutputIcon from '@/assets/images/output.svg?raw'



export interface Props {
  editor: {getEditor: () => Editor} |undefined
  dark?: boolean
  getPreViewInstance?: () => HTMLElement
  toolbars?: { addTools?: ToolbarItem[]; excludeTools?: string[]; orderTools?: { type: string; order: number }[]; }
}
const props = withDefaults(defineProps<Props>(), {
  dark: false
})


const emits = defineEmits(['toggleFullscreen', 'editorStateChange', 'toggleShowContent'])


//表情相关
const emojiIndex = ref(new EmojiIndex(data))
function selectEmoji(emoji: any) {
  toolOnClick(emoji.native, "end")
}



//常规的工具用法
const toolOnClick = (syntax: string, site: "middle" | "end", suffix?: string) => {
  const editor = props.editor!.getEditor()
  const selection = editor.getSelection();
  if(selection){
  const selectedText = editor.getModel()?.getValueInRange(selection);
  //获取光标位置
  const position = editor.getPosition();
  if(position) {
    let newText: string = "";
    //新的光标位置
    let newColumn;
    //如果选中文字
    if (selectedText) {
      if (site == "middle") {
        newText = `${syntax}${selectedText}${suffix ? suffix : syntax}`;
      } else if (site == "end") {
        newText = `${syntax} ${selectedText}`;
      }
      editor.executeEdits('', [
        {
          range: selection,
          text: newText
        }
      ]);
    } else {
      if (site === "middle") {
        newText = `${syntax}${suffix ? suffix : syntax}`;
      } else if (site === "end") {
        newText = `${syntax} `;
      }
      editor.executeEdits('', [
        {
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          },
          text: newText
        }
      ]);

    }

    if (selection.selectionStartColumn < selection.endColumn) {
      //从前往后选
      if (site === "middle") {
        newColumn = selection.selectionStartColumn + syntax.length + selectedText!.length;
      } else if (site === "end") {
        newColumn = selection.selectionStartColumn + syntax.length + 1 + selectedText!.length;
      }
    } else {
      //从后往前选
      if (site === "middle") {
        newColumn = position.column + syntax.length + selectedText!.length;
      } else if (site === "end") {
        newColumn = position.column + syntax.length + 1 + selectedText!.length;
      }
    }
    editor.setPosition({
      lineNumber: position.lineNumber,
      column: newColumn as number
    });
    editor.focus();
  }
  }
}

//工具栏
let toolBars: ToolbarItem[] = [
  {
    title: "Heading",
    type: BaseToolbarType.HEADING,
    icon: HeadingIcon,
    list: [
      {
        title: "Heading-1",
        type: BaseToolbarType.HEADING_1,
        onClick: () => {
          toolOnClick("#", "end")
        }
      },
      {
        title: "Heading-2",
        type: BaseToolbarType.HEADING_2,
        onClick: () => {
          toolOnClick("##", "end")
        }
      },
      {
        title: "Heading-3",
        type: BaseToolbarType.HEADING_3,
        onClick: () => {
          toolOnClick("###", "end")
        }
      },
      {
        title: "Heading-4",
        type: BaseToolbarType.HEADING_4,
        onClick: () => {
          toolOnClick("####", "end")
        }
      },
      {
        title: "Heading-5",
        type: BaseToolbarType.HEADING_5,
        onClick: () => {
          toolOnClick("#####", "end")
        }
      },
      {
        title: "Heading-6",
        type: BaseToolbarType.HEADING_6,
        onClick: () => {
          toolOnClick("######", "end")
        }
      }

    ],
  },
  {
    title: "Bold",
    type: BaseToolbarType.BOLD,
    icon : BoldIcon,
    hotkey: {
      command: "Ctrl B",
      description: "粗体",
      handle: () => {
        toolOnClick("**", "middle")
      }
    },
    onClick: () => {
      toolOnClick("**", "middle")
    },
  },
  {
    title: "Italic",
    type: BaseToolbarType.ITALIC,
    icon : ItalicIcon,
    hotkey: {
      command: "Ctrl I",
      description: "斜体",
      handle: () => {
        toolOnClick("_", "middle")
      }
    },
    onClick: () => {
      toolOnClick("_", "middle")
    },
  },
  {
    title: "Underline",
    type: BaseToolbarType.UNDERLINE,
    icon : UnderlineIcon,
    hotkey: {
      command: "Ctrl U",
      description: "下划线",
      handle: () => {
        toolOnClick("--", "middle")
      }
    },
    onClick: () => {
      toolOnClick("--", "middle")
    },
  },
  {
    title: "Delete",
    type: BaseToolbarType.DELETE,
    icon : DeleteIcon,
    hotkey: {
      command: "Ctrl Shift X",
      description: "删除线",
      handle: () => {
        toolOnClick("~~", "middle")
      }
    },
    onClick: () => {
      toolOnClick("~~", "middle")
    },
  },
  {
    title: "Quote",
    type: BaseToolbarType.BLOCKQUOTE,
    icon : BlockquoteIcon,
    hotkey: {
      command: "Ctrl Shift Q",
      description: "引用",
      handle: () => {
        toolOnClick(">", "end")
      }
    },
    onClick: () => {
      toolOnClick(">", "end")
    },
  },
  {
    title: "Ul",
    type: BaseToolbarType.UL,
    icon : UlIcon,
    hotkey: {
      command: "Ctrl Alt U",
      description: "无序列表",
      handle: () => {
        toolOnClick("-", "end")
      }
    },
    onClick: () => {
      toolOnClick("-", "end")
    },
  },
  {
    title: "Ol",
    type: BaseToolbarType.OL,
    icon : OlIcon,
    hotkey: {
      command: "Ctrl Alt O",
      description: "有序列表",
      handle: () => {
        toolOnClick("1.", "end")
      }
    },
    onClick: () => {
      toolOnClick("1.", "end")
    },
  },
  {
    title: "InlineCode",
    type: BaseToolbarType.INLINECODE,
    icon : InlineCodeIcon,
    hotkey: {
      command: "Ctrl Alt I",
      description: "行内代码块",
      handle: () => {
        toolOnClick("\`", "middle")
      }
    },
    onClick: () => {
      toolOnClick("\`", "middle")
    },
  },
  {
    title: "Code Block",
    type: BaseToolbarType.CODE,
    icon : CodeIcon,
    hotkey: {
      command: "Ctrl Alt C",
      description: "代码块",
      handle: () => {
        toolOnClick("\`\`\`", "middle", `
\`\`\``)
      }
    },
    onClick: () => {
      toolOnClick("\`\`\`", "middle", `
\`\`\``)
    },
  },
  {
    title: "Link",
    type: BaseToolbarType.LINK,
    icon : LinkIcon,
    hotkey: {
      command: "Ctrl Alt L",
      description: "链接",
      handle: () => {
        toolOnClick("[", "middle", "]()")
      }
    },
    onClick: () => {
      toolOnClick("[", "middle", "]()")
    },
  },
  {
    title: "Add Image",
    type: BaseToolbarType.IMAGE,
    icon : ImageIcon,
    hotkey: {
      command: "Ctrl Shift I",
      description: "添加图片",
      handle: () => {
        toolOnClick("![", "middle", "](URL)")
      }
    },
    onClick: () => {
      toolOnClick("![", "middle", "](URL)")
    },
  },
  {
    title: "Table",
    type: BaseToolbarType.TABLE,
    icon : TableIcon,
    hotkey: {
      command: "Ctrl Alt T",
      description: "表格",
      handle: () => {
        toolOnClick("|  表头", "middle", "  |  表头  |\n" +
          "| ----- | ----- |\n" +
          "| 单元格 | 单元格 |")
      }
    },
    onClick: () => {
      toolOnClick("|  表头", "middle", "  |  表头  |\n" +
        "| ----- | ----- |\n" +
        "| 单元格 | 单元格 |")
    },
  },
  {
    title: "Emoji",
    type: BaseToolbarType.EMOJI,
    icon : EmojiIcon,
  },
  {
    title: "FullScreen",
    type: BaseToolbarType.FULLSCREEN,
    icon : FullscreenIcon,
    hotkey: {
      command: "Ctrl Alt F",
      description: "全屏",
      handle: () => {

        emits('toggleFullscreen')
      }
    },
    onClick: () => {
      emits('toggleFullscreen')
    },
  },
  {
    title: "Write",
    type: BaseToolbarType.WRITE,
    icon : WriteIcon,
    hotkey: {
      command: "Ctrl Alt P",
      description: "只写",
      handle: () => {
        emits('editorStateChange', "onlyWrite")
      }
    },
    onClick: () => {
      emits('editorStateChange', "onlyWrite")
    },
  },
  {
    title: "Read",
    type: BaseToolbarType.PREVIEW,
    icon : PreViewIcon,
    hotkey: {
      command: "Ctrl Alt R",
      description: "只读",
      handle: () => {
        emits('editorStateChange', "onlyRead")
      }
    },
    onClick: () => {
      emits('editorStateChange', "onlyRead")
    },
  },
  {
    title: "目录",
    type: BaseToolbarType.CONTENTS,
    icon : ContentsIcon,
    onClick: () => {
      emits('toggleShowContent')
    },
  },
  {
    title: "导出为PDF",
    type: BaseToolbarType.OUTPUT,
    icon : OutputIcon,
    onClick: () => {
      //@ts-ignore
      const preViewInstance = props.getPreViewInstance()
      const exportToPDF = () => {
        const element = preViewInstance;
        if (!element) return;

        // 1. 克隆节点（深拷贝）
        const clone = element.cloneNode(true);

        // 2. 修改克隆节点的样式
        // @ts-ignore
        clone.style.width = '100vw';


        // 3. 将克隆节点临时添加到DOM（确保样式计算正确）
        document.body.appendChild(clone);

        // 4. 导出PDF
        const opt = {
          margin: 0,
          filename: 'document.pdf',
          jsPDF: { unit: 'mm', format: 'a4' }
        };

        html2pdf()
          .from(clone)
          .set(opt)
          .save()
          .finally(() => {
            // 5. 移除克隆节点
            document.body.removeChild(clone);
          });
      };
      exportToPDF()
    }
  }
]
//工具栏配置
if(props.toolbars){
  //排除，添加。排序
  //1.排除
  if(props.toolbars.excludeTools){
    toolBars = toolBars.filter((toolBar)=>{
      return !props.toolbars!.excludeTools?.includes(toolBar.type)
    })
  }
  //2.添加
  if(props.toolbars.addTools){
    props.toolbars.addTools.forEach(tool=>{
      toolBars.push(tool);
    })
  }
  //3.排序
  if(props.toolbars.orderTools){
    console.log(props.toolbars.orderTools)
    props.toolbars.orderTools.forEach(toolOrder=>{
      toolBars.forEach(toolBar=>{
        if(toolBar.type === toolOrder.type){
          toolBar.order = toolOrder.order;
        }
      })
    })
    toolBars.forEach(toolBar=>{
      if(!toolBar.order){
        toolBar.order = 99999999
      }
      console.log(toolBar)
    })

    toolBars.sort((a,b)=>{
      if(a.order && b.order){
        return a.order - b.order
      }else{
        return 0
      }
    })
  }
}

function registerHotKey(editor: Editor): void {
  //注册所有快捷键
  function registerHotKeyOne(toolbarItem: ToolbarItem) {
    if (toolbarItem.hotkey) {
      const customKeybinding = stringToKeybinding(toolbarItem.hotkey.command)
      // 添加自定义命令
      // 检查 toolbarItem.hotkey.handle 是否为 undefined
      if (toolbarItem.hotkey.handle) {
        editor.addCommand(customKeybinding, toolbarItem.hotkey.handle);
      }
    }
  }
  toolBars.forEach((item) => {
    registerHotKeyOne(item);
    if (item.list) {
      item.list.forEach(listItem => {
        registerHotKeyOne(listItem);
      })
    }
  })

}
// 将editor实例给暴露出去
defineExpose({
  registerHotKey
})
//@ts-ignore
const dropdownSelect = (item:ToolbarItem) => item.onClick()
</script>

<template>
  <div class="tool-bar">
    <ul>
      <template v-for="(toolbar, index) in toolBars" :key="index">
        <n-dropdown placement="bottom-start" v-if="toolbar.list" 
          @select="dropdownSelect" trigger="hover"
          :options="toolbar.list.map((item) => {
             const option: DropdownMixedOption = { label: item.title, key: item.type }
              return option
      })">
          <li>
            <div v-html="toolbar.icon" class="toolbar-icon" :class="{ svgDark: props.dark }"></div>
          </li>
        </n-dropdown>

        <li v-if="!toolbar.list && toolbar.title !== `Emoji` && toolbar.onClick" @click="toolbar.onClick()">
          <n-popover trigger="hover" style="text-align: center">
            <template #trigger>
              <div v-html="toolbar.icon" class="toolbar-icon" :class="{ svgDark: props.dark }"></div>
            </template>
            <template #header v-if="toolbar.hotkey">
              <n-text strong depth="1">
                {{ toolbar.hotkey!.command }}
              </n-text>
            </template>
            {{ toolbar.hotkey ? toolbar.hotkey!.description : toolbar.title }}
          </n-popover>
        </li>

        <li v-if="!toolbar.list && toolbar.title === `Emoji`">
          <n-popover trigger="hover" style="text-align: center" raw placement="bottom">
            <template #trigger>
              <div v-html="toolbar.icon" class="toolbar-icon" :class="{ svgDark: props.dark }"></div>
            </template>
            <Picker class="picker" :data="emojiIndex" set="twitter" @select="selectEmoji" />
          </n-popover>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.tool-bar {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  background-color: var(--toolbar-background-color);
  border-bottom: 1px solid var(--border-color);
}

ul {
  list-style: none;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 20px;
  gap: 10px;

}

li {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  width: 22px;
}

li:hover {
  background-color: var(--li-hover-back-color) ;
  cursor: pointer;
  border-radius: 4px;
}


.toolbar-icon {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svgDark {
  filter: brightness(0) invert(1);
}
</style>