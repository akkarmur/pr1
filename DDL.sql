CREATE TABLE `user` (
  id bigint NOT NULL AUTO_INCREMENT,
  name varchar(32) NOT NULL,
  email varchar (32) NOT NULL,
  pass varchar (32) NOT NULL,
  is_deleted smallint NOT NULL DEFAULT '0',
  `create_timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
);

CREATE TABLE `category` (
  id bigint NOT NULL AUTO_INCREMENT,
  name varchar(32) NOT NULL,
  image text,
  parent_id bigint,
  is_deleted smallint NOT NULL DEFAULT '0',
  `create_timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
);


CREATE TABLE `product` (
  id bigint NOT NULL AUTO_INCREMENT,
  name varchar(32) NOT NULL,
  price int not null,
  image text,
  category_id bigint not null,
  is_deleted smallint NOT NULL DEFAULT '0',
  `create_timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  CONSTRAINT `product_fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);