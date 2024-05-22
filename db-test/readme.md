set TZ -> https://docs.diladele.com/docker/timezones.html

copy file using docker command
```bash
docker cp .\mysqld.cnf mysqldb-1:/etc/mysql/mysql.conf.d
```

docker restart mysqldb-1

Verifica iil file:
```bash
cat /etc/mysql/mysql.conf.d/mysqld.cnf
```
Verifica i contenuti dei log:
```bash
cat /var/lib/mysql/general.log
cat /var/lib/mysql/slow.log
cat /var/lib/mysql/error.log
```