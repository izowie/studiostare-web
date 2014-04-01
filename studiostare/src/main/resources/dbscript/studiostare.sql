SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

use mysql;
drop user 'studiostare'@'localhost';
drop user 'studiostare'@'%';
delete from user where user='studiostare' and host='localhost';
delete from user where user='studiostare' and host='%';
create user 'studiostare'@'localhost' identified by 'studiostare';
create user 'studiostare'@'%' identified by 'studiostare';
grant all on studiostare.* to 'studiostare'@'localhost';
grant all on studiostare.* to 'studiostare'@'%';
flush privileges;

DROP SCHEMA IF EXISTS `studiostare` ;
CREATE SCHEMA IF NOT EXISTS `studiostare` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `studiostare` ;

-- -----------------------------------------------------
-- Table `studiostare`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiostare`.`role` ;

CREATE TABLE IF NOT EXISTS `studiostare`.`role` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(1024) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `studiostare`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiostare`.`user` ;

CREATE TABLE IF NOT EXISTS `studiostare`.`user` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL COMMENT '名称',
  `password` VARCHAR(255) NULL COMMENT '密码，非必填，管理员必填。',
  `email` VARCHAR(255) NULL,
  `role_id` INT NULL COMMENT '所属角色，1：管理员；2：抓取新闻的用户；3：关于我们中的人员列表',
  `capture_news_flag` INT NULL COMMENT '是否需要抓取新闻的标识',
  `twitter_user` VARCHAR(255) NULL COMMENT '抓取新闻的账号',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_to_role_role_id`
    FOREIGN KEY (`id`)
    REFERENCES `studiostare`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `studiostare`.`client`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiostare`.`client` ;

CREATE TABLE IF NOT EXISTS `studiostare`.`client` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL COMMENT '名称',
  `phone` VARCHAR(255) NOT NULL COMMENT '电话',
  `email` VARCHAR(255) NOT NULL COMMENT '邮箱',
  `description` VARCHAR(1024) NULL COMMENT '描述',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `studiostare`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiostare`.`category` ;

CREATE TABLE IF NOT EXISTS `studiostare`.`category` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL COMMENT '分类名称',
  `description` VARCHAR(1024) NULL COMMENT '描述',
  `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `studiostare`.`video`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiostare`.`video` ;

CREATE TABLE IF NOT EXISTS `studiostare`.`video` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL COMMENT '名称',
  `img_path` VARCHAR(1024) NOT NULL COMMENT '视频预览图片地址',
  `video_path` VARCHAR(1024) NOT NULL COMMENT '视频地址',
  `description` VARCHAR(1024) NOT NULL COMMENT '视频描述',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `studiostare`.`videoref`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiostare`.`videoref` ;

CREATE TABLE IF NOT EXISTS `studiostare`.`videoref` (
  `id` INT NOT NULL,
  `video_id` INT NOT NULL COMMENT '视频ID',
  `client_id` INT NULL COMMENT '客户ID',
  `category_id` INT NULL COMMENT '分类ID',
  `description` VARCHAR(1024) NOT NULL COMMENT '描述',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_video_id`
    FOREIGN KEY (`id`)
    REFERENCES `studiostare`.`video` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_client_id`
    FOREIGN KEY (`id`)
    REFERENCES `studiostare`.`client` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_category_id`
    FOREIGN KEY (`id`)
    REFERENCES `studiostare`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `studiostare`.`about`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiostare`.`about` ;

CREATE TABLE IF NOT EXISTS `studiostare`.`about` (
  `id` INT NOT NULL,
  `office_img_path` VARCHAR(1024) NOT NULL COMMENT '办公室照片地址',
  `about_us_info` VARCHAR(1024) NOT NULL COMMENT '关于我们',
  `manifesto` VARCHAR(1024) NOT NULL COMMENT '宣言',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `studiostare`.`news`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studiostare`.`news` ;

CREATE TABLE IF NOT EXISTS `studiostare`.`news` (
  `id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL COMMENT '新闻标题	',
  `content` VARCHAR(1024) NOT NULL COMMENT '新闻内容',
  `photo_path` VARCHAR(1024) NULL COMMENT '新闻照片地址，非必填',
  `video_path` VARCHAR(1024) NULL COMMENT '新闻视频地址，非必填',
  `user_id` INT NULL COMMENT '新闻所属用户',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_news_to_user_user_id`
    FOREIGN KEY (`id`)
    REFERENCES `studiostare`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
