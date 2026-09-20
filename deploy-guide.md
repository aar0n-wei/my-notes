# VitePress + GitHub Pages + 自定义域名部署实践指南

本文记录了将基于 VitePress 的个人博客/知识库（[Gwen Note](https://blog.wgwen.top)）部署至 GitHub Pages 并绑定个人独立域名的完整流程、核心要点与排错经验。

---

## 一、架构总览

- **静态站点框架**：[VitePress](https://vitepress.dev/)
- **代码托管与 CI/CD**：GitHub + GitHub Actions
- **静态网页托管**：GitHub Pages
- **自定义域名解析**：DNSPod / 腾讯云解析
- **安全证书**：GitHub Pages 自动签发并续期的 Let's Encrypt SSL/TLS 证书

---

## 二、本地项目准备与 Git 规范

### 1. 忽略文件配置（.gitignore）
避免将体积巨大的依赖及每次变动的构建产物推送到仓库：

```gitignore
node_modules
.vitepress/dist
.vitepress/cache
.DS_Store
Thumbs.db
```

### 2. 避免域名丢失：配置 `public/CNAME`
GitHub Pages 在使用自定义域名时依赖打包产物根目录下的 `CNAME` 文件。

> [!IMPORTANT]
> VitePress 在项目根目录运行时，静态资源目录默认优先读取根目录下的 **`public/`**。
> 因此必须在根目录创建 `public/CNAME` 文件，内容填写自定义域名：
> ```
> blog.test.top
> ```
> VitePress 在每次运行 `npm run docs:build` 时，会自动将 `public/` 里的所有文件原封不动复制到 `.vitepress/dist/` 产物根目录。

---

## 三、GitHub Actions 自动化部署工作流

在 `.github/workflows/deploy.yml` 中配置自动化流水线。每当 `main` 分支有代码提交时，GitHub 云端会自动拉取、构建并发布。

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22 # 建议使用当前 LTS 稳定版
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          enablement: true

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 四、DNS 解析设置（域名提供商控制台）

在域名解析控制台（如腾讯云 DNSPod、阿里云、Cloudflare 等）中，针对二级域名添加 **CNAME** 记录：

| 记录类型 | 主机记录 | 记录值 | TTL | 作用说明 |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `blog` | `test.github.io` | 默认 (600) | 将 `blog.test.top` 解析指向 GitHub Pages 服务节点 |

> [!TIP]
> 如果您使用的是主域名（如 `test.top`），则无法使用 CNAME，需要添加 4 条 `A` 记录指向 GitHub 的 IP 地址：
> - `185.199.108.153`
> - `185.199.109.153`
> - `185.199.110.153`
> - `185.199.111.153`

---

## 五、GitHub 仓库关键配置

进入 GitHub 仓库的 **Settings -> Pages**：

1. **构建来源（Build and deployment -> Source）**：
   - **必须**选择 **`GitHub Actions`**。
   - （切勿选择默认的 Deploy from a branch，否则 Actions 流水线无权调度 Pages 发布）。
2. **自定义域名（Custom domain）**：
   - 填入 `blog.test.top` 并点击 **Save**。
   - GitHub 会自动触发 DNS 检查（DNS Check Successful）。
3. **强制 HTTPS（Enforce HTTPS）**：
   - 域名绑定后，GitHub 会向 Let's Encrypt 申请 SSL/TLS 证书（通常耗时 1~3 分钟）。
   - 证书就绪后，勾选 **Enforce HTTPS** 确保所有 HTTP 流量自动重定向至安全加密连接。

---

## 六、踩坑记录与排障精要

### 1. 流水线报错：`HttpError: Not Found` / `Get Pages site failed`
- **现象**：首次推送后 GitHub Actions 在 `Setup Pages` 步骤报 404 错误。
- **原因**：GitHub 新建仓库默认未开启 Pages 功能，调用 API 时找不到对应 Pages 站点。
- **解法**：在仓库 **Settings -> Pages** 中将 **Source** 主动切换为 **`GitHub Actions`**；并在 workflow 的 `configure-pages` 步骤添加 `enablement: true`。

### 2. 绑定后访问提示 404（There isn't a GitHub Pages site here）
- **原因**：在 GitHub 仓库点击 Save 之前，浏览器或本地 DNS 节点缓存了未绑定状态时的 404 响应（Fastly 节点默认缓存数百秒）。
- **解法**：
  1. 打开浏览器**无痕/隐身窗口**访问。
  2. 在普通窗口按 **`Ctrl + F5`** 强制清除缓存刷新。
  3. 确认网址使用的是 `https://` 协议而非 `http://`。

### 3. Node.js 版本废弃警告
- **现象**：Action 警告 `Node.js 20 is deprecated... forced to run on Node.js 24`。
- **解法**：将 workflow 中的 `node-version` 显式指定为 `22` 或更新的 LTS 版本。

---

## 七、日常写作与同步工作流

配置完成后，今后发布新博客或笔记无需关注任何运维细节：

```powershell
# 1. 在本地添加或修改 Markdown 文件
# 2. 提交并推送到 GitHub
git add .
git commit -m "docs: 记录新文章"
git push origin main
```

推送后 GitHub Actions 会在 1~2 分钟内自动完成打包并实时上线。
