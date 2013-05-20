CREATE DATABASE chat;

USE chat;

/*
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int(10)      | NO   | PRI | NULL    | auto_increment |
| roomid   | int(10)      | YES  |     | NULL    |                |
| username | varchar(25)  | YES  |     | NULL    |                |
| message  | varchar(140) | YES  |     | NULL    |                |
| date     | int(10)      | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
*/
CREATE TABLE `messages` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `roomid` INT(10),
  `username` VARCHAR(25),
  `message` VARCHAR(140),
  `date` INT(10),
  PRIMARY KEY  (`id`)
);
-- CREATE TABLE `users` (
--   `id` INT(10) NOT NULL AUTO_INCREMENT,
--   `username` VARCHAR(25),
--   `date` INT(10),
--   PRIMARY KEY  (`id`)
-- );

-- CREATE TABLE `rooms` (
--   `id` INT(10) NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(25),
--   `createdby` INT(10),
--   `date` INT(10),
--   PRIMARY KEY  (`id`)
-- );

-- ALTER TABLE `rooms` ADD CONSTRAINT `rooms_fk1` FOREIGN KEY (`createdby`) REFERENCES users(`id`);
-- ALTER TABLE `messages` ADD CONSTRAINT `messages_fk1` FOREIGN KEY (`roomid`) REFERENCES rooms(`id`);
-- ALTER TABLE `messages` ADD CONSTRAINT `messages_fk2` FOREIGN KEY (`userid`) REFERENCES users(`id`);

-- insert into users (username, date) values ('joe', '1369085717');
-- insert into users (username, date) values ('jamie', '1369085757');
-- insert into users (username, date) values ('bill', '1369085767');
-- insert into users (username, date) values ('cody', '1369085777');
-- insert into users (username, date) values ('randy', '1369085787');
-- insert into users (username, date) values ('hacker', '1369085797');

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/