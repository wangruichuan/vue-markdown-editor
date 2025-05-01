import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vue-markdown-editor/",
  title: "MarkDown Editor for Vue3",
  description: "基于Vue3的Markdown编辑器组件",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/introduce' },
      { text: '在线尝试', link: '/online-experience' }
    ],
    logo:'/logo.svg',

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '介绍', link: '/introduce' },
          { text: '快速上手', link: '/start' }
        ]
      },
      {
        text: '参考',
        items: [
          { text: 'API', link: '/api' },
          { text: '快捷键', link: '/hotkey' },
          { text: 'Markdown语法', link: '/grammar' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wangruichuan/vue-markdown-editor' }
    ],
    outline:{
      level:"deep",
      label:"本页目录"
    }
  }
})
