# Windows & WSL 环境排障

记录 Windows 开发环境、PowerShell 脚本、WSL2 与网络配置问题。

## 常见问题速查

### 1. 端口被占用查看与强杀

```powershell
# 查找占用指定端口（例如 8080）的 PID
netstat -ano | findstr :8080

# 强行终止对应 PID 进程
taskkill /F /PID <PID>
```

### 2. WSL2 镜像网络模式 (`.wslconfig`)

若 WSL2 与宿主机网络通信异常或需要共享宿主机代理，可编辑 `C:\Users\<用户名>\.wslconfig`：

```ini
[wsl2]
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
```

## 故障笔记

- [WSL2 代理与网络互通配置](/os/windows/) *(待补充)*
- [Hyper-V 保留端口导致端口冲突排查](/os/windows/) *(待补充)*
