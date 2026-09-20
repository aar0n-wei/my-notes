# Git & 常用工具踩坑

记录 Git 版本控制、常用软件安装与排错经验。

## Git 紧急抢救命令

```bash
# 撤销刚刚的 commit 但保留修改代码
git reset --soft HEAD~1

# 彻底丢弃工作区所有未提交的修改
git reset --hard HEAD
git clean -fd

# 找回误删的 commit / 分支（救命神器）
git reflog
```

## 文章列表

- [Git 提交历史误传敏感密码/私钥彻底擦除](/tools/git/) *(待补充)*
- [Nginx 常见 502 / 504 错误与缓冲区配置](/tools/git/) *(待补充)*
