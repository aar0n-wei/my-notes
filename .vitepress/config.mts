import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Gwen Note',
  description: '技术踩坑与运维知识库',
  lang: 'zh-CN',

  themeConfig: {
    // 启用本地全文搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    // 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '容器与运维', link: '/devops/docker/' },
      { text: '系统环境', link: '/os/windows/' },
      { text: '工具与杂项', link: '/tools/git/' },
      { text: '站点部署指南', link: '/deploy-guide' }
    ],

    // 路径映射独立侧边栏
    sidebar: {
      '/devops/': [
        {
          text: 'Docker 容器',
          collapsed: false,
          items: [
            { text: 'Docker 概览与速查', link: '/devops/docker/' }
          ]
        },
        {
          text: 'Linux 运维',
          collapsed: false,
          items: [
            { text: 'Linux 故障排查概览', link: '/devops/linux/' }
          ]
        },
        {
          text: '数据库运维 (MySQL)',
          collapsed: false,
          items: [
            { text: 'MySQL 目录与排障', link: '/devops/mysql/' }
          ]
        }
      ],

      '/os/': [
        {
          text: 'Windows / WSL',
          collapsed: false,
          items: [
            { text: 'Windows 环境与排障', link: '/os/windows/' }
          ]
        }
      ],

      '/tools/': [
        {
          text: '开发工具 & 软件',
          collapsed: false,
          items: [
            { text: 'Git 常用技巧与踩坑', link: '/tools/git/' }
          ]
        }
      ],

      // 部署指南
      '/deploy-guide': [
        {
          text: '运维与部署',
          items: [
            { text: 'VitePress 部署实践指南', link: '/deploy-guide' }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3],
      label: '本页大纲'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aar0n-wei/my-notes' }
    ]
  }
})
