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

```sql
CREATE DATABASE IF NOT EXISTS `magic_shop`;
USE `magic_shop`;

/* Optional steps to create a user
CREATE USER 'chas'@'%' IDENTIFIED BY 'secret-password';
GRANT ALL PRIVILEGES ON magic_shop.* TO 'chas'@'%';
FLUSH PRIVILEGES;
*/

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `item` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `description` TEXT,
    `price` DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS `orders` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user` INT NOT NULL,
    `total` DECIMAL(10,2) DEFAULT NULL,
    `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user`) REFERENCES `user`(`id`)
);

CREATE TABLE IF NOT EXISTS `order_item` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `item` INT NOT NULL,
    `order_id` INT NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `quantity` INT NOT NULL,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`),
    FOREIGN KEY (`item`) REFERENCES `item`(`id`)
);

LOAD DATA INFILE '/tmp/items.tsv'
REPLACE INTO TABLE `item`
FIELDS TERMINATED BY '\t'
IGNORE 1 LINES
(`name`, `description`, `price`);
```

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