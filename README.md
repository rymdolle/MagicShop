# MagicShop

## Run mariadb docker container
```
docker run --detach --name mariadb --env MARIADB_ROOT_PASSWORD=your-secret-pw mariadb:latest
```

## Connect and create database and table

### Copy TSV file
```
docker cp items.tsv mariadb:/tmp
```

### Connect to database
```
docker exec -it mariadb mariadb --user root --password
```

Import [script/database.sql](script/database.sql)

## Create a `.env` file with database credentials

### Get IP address of the container

```
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadb
```

### Fill in credentials in `.env`

Example
```
DB_HOST='172.17.0.2'
DB_USER='chas'
DB_PASS='secret-password'
DB_NAME='magic_shop'
```

## Run

```
npm install
npm run server
```