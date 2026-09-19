---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Gwen Note"
  text: "不积跬步无以至千里，不积小流无以成江海。"
  tagline: 基于 VitePress + GitHub Pages 自动化构建的个人博客与技术知识库
  actions:
    - theme: brand
      text: 部署与配置指南
      link: /deploy-guide
    - theme: alt
      text: Markdown 示例
      link: /markdown-examples

features:
  - title: VitePress 驱动
    details: 极速开发体验，依托 Vite 与 Vue 3，秒级热重载与轻量打包。
  - title: 自动化 CI/CD
    details: 代码提交至 main 分支即自动触发 GitHub Actions 构建并同步发布。
  - title: 独立域名与 HTTPS
    details: 接入自定义域名 blog.wgwen.top，全站强制 Let's Encrypt SSL/TLS 加密。
---

