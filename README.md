# REST_Demo

## Run mariadb docker container
```
$ docker run --detach --name mariadb --env MARIADB_ROOT_PASSWORD=your-secret-pw mariadb:latest
```

## Connect and create database and table.

### Copy TSV file
```
$ docker cp items.tsv mariadb:/tmp
```

### Connect to database
```
$ docker exec -it mariadb mariadb --user root --password
```

```sql
CREATE DATABASE IF NOT EXISTS nodejs_rest_demo;
USE nodejs_rest_demo;

/* Optional steps to create a user
CREATE USER 'chas'@'%' IDENTIFIED BY 'secret-password';
GRANT ALL PRIVILEGES ON nodejs_rest_demo.* TO 'chas'@'%';
FLUSH PRIVILEGES;
*/

CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS item (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

LOAD DATA INFILE '/tmp/items.tsv'
REPLACE INTO TABLE item
FIELDS TERMINATED BY '\t'
IGNORE 1 LINES
(name, description, price);
```

## Create a `.env` file with database credentials

```
DB_HOST='172.17.0.2'
DB_USER='chas'
DB_PASS='secret-password'
DB_NAME='nodejs_rest_demo'
```