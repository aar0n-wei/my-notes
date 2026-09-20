# Linux 运维排障

整理日常 Linux 服务器运维、进程、磁盘与网络问题。

## 故障快速定位清单

1. **CPU 飙升**：`top -c` 或 `htop`，按 `P` 排序。
2. **内存耗尽 (OOM)**：`free -h`，检查 `dmesg -T | grep -i oom`。
3. **磁盘写满**：`df -h` 查看分区，`du -sh /* 2>/dev/null | sort -hr` 查找大文件。
4. **端口与连通性**：`ss -tulpn` 或 `netstat -tlpn`，`curl -iv`。

## 文章列表

- [根目录 100% 占满与 Inodes 耗尽清理](/devops/linux/) *(待补充)*
- [Systemd 服务启动失败排查与日志提取](/devops/linux/) *(待补充)*
