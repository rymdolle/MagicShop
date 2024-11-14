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
