# Docker 容器踩坑与速查

用于整理日常在使用 Docker 与 Docker Compose 过程中碰到的网络、挂载、镜像拉取与资源占满等故障。

## 常用命令速查

| 操作 | 命令 | 说明 |
| :--- | :--- | :--- |
| 查看容器资源实时消耗 | `docker stats` | 内存/CPU/网络 IO |
| 查看容器最后 100 行日志 | `docker logs -f --tail 100 <container>` | 实时跟踪排查异常 |
| 彻底清理无用缓存 | `docker system prune -a --volumes` | 释放磁盘空间（注意数据卷） |

## 故障与排查记录

- [容器间网络通信异常与 DNS 解析失败](/devops/docker/) *(待补充)*
- [镜像拉取超时与国内加速源配置](/devops/docker/) *(待补充)*
