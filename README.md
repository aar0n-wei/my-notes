# Gwen Note

> 不积跬步无以至千里，不积小流无以成江海。

个人独立博客与知识库笔记，基于 VitePress 构建，通过 GitHub Actions 自动部署至 GitHub Pages，并绑定独立域名。

- 🌐 **博客地址**：[https://blog.wgwen.top](https://blog.wgwen.top)
- 📖 **部署实战指南**：[VitePress + GitHub Pages 部署实践指南](./deploy-guide.md)

---

## 本地开发与运行

```bash
# 安装依赖
npm install

# 启动本地开发服务
npm run docs:dev

# 构建打包产物
npm run docs:build

# 本地预览构建产物
npm run docs:preview
```

---

## 自动化部署架构

本项目通过 GitHub Actions 实现了代码推送即自动发布的 CI/CD 流程：
1. 提交代码至 `main` 分支。
2. GitHub Actions 触发 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)。
3. 在云端执行依赖安装与 `npm run docs:build`。
4. 打包产物连带 `public/CNAME` 自动同步发布至 GitHub Pages。
