#!/bin/sh
# A private MySQL for this project on port 3318, so it needs no password on your main server.
# The data lives in backend/mysql-data (gitignored). Run: npm run db:local
cd "$(dirname "$0")/.." || exit 1
DATA="$PWD/mysql-data"
if [ ! -d "$DATA" ]; then
  mysqld --initialize-insecure --datadir="$DATA" || exit 1
fi
mysqld --datadir="$DATA" --port=3318 --socket=/tmp/bhga-mysql.sock --mysqlx=OFF --bind-address=127.0.0.1 --pid-file="$DATA/mysqld.pid" &
PID=$!
trap 'kill $PID' INT TERM
until mysql -uroot -h127.0.0.1 -P3318 -e "CREATE DATABASE IF NOT EXISTS bhga_web CHARACTER SET utf8mb4" 2>/dev/null; do
  sleep 1
done
echo "MySQL ready on 127.0.0.1:3318"
wait $PID
