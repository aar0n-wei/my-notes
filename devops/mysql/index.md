# MySQL 常见问题与排障

用于记录 MySQL 使用过程中的锁等待、慢查询、连接池打满及配置踩坑。

## 常用排查 SQL

```sql
-- 查看当前活跃连接与执行中的线程
SHOW FULL PROCESSLIST;

-- 查看 InnoDB 事务与锁状态
SELECT * FROM information_schema.INNODB_TRX;
SELECT * FROM performance_schema.data_locks;

-- 查看慢查询配置
SHOW VARIABLES LIKE '%slow_query%';
```

## 故障笔记

- [ERROR 1045 (28000): Access denied for user 权限重置](/devops/mysql/) *(待补充)*
- [Lock wait timeout exceeded 事务锁排查实录](/devops/mysql/) *(待补充)*
