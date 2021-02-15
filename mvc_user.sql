-- Adminer 4.7.8 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `mvc_user`;
CREATE TABLE `mvc_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authority` varchar(10) NOT NULL DEFAULT 'user',
  `name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL DEFAULT 'example@webmail.co.jp',
  `password` varchar(100) NOT NULL,
  `tel` varchar(20) NOT NULL DEFAULT '09012345678',
  `address` varchar(100) NOT NULL DEFAULT 'Tokyo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `mvc_user` (`id`, `authority`, `name`, `email`, `password`, `tel`, `address`) VALUES
(1,	'admin',	'boss',	'boss@webmail.co.jp',	'$2y$10$Md8XsrqIneLKHQPJYGnwyeLyMa97A2m6ge84fiRQqBIfdBzC3MMwO',	'080987654321',	'Tokyo Chiyoda Ochanomizu'),
(2,	'user',	'worker1',	'worker1@webmail.co.jp',	'$2y$10$Md8XsrqIneLKHQPJYGnwyeLyMa97A2m6ge84fiRQqBIfdBzC3MMwO',	'09012345678',	'Tokyo Sumida Oshiage'),
(3,	'user',	'worker2',	'worker2@webmail.co.jp',	'$2y$10$Md8XsrqIneLKHQPJYGnwyeLyMa97A2m6ge84fiRQqBIfdBzC3MMwO',	'09012345678',	'Tokyo Adachi Machida'),
(4,	'user',	'worker3',	'worker3@webmail.co.jp',	'$2y$10$Md8XsrqIneLKHQPJYGnwyeLyMa97A2m6ge84fiRQqBIfdBzC3MMwO',	'09012345678',	'Tokyo Bunkyo Hakusan'),
(5,	'user',	'worker4',	'worker4@webmail.co.jp',	'$2y$10$Md8XsrqIneLKHQPJYGnwyeLyMa97A2m6ge84fiRQqBIfdBzC3MMwO',	'09012345678',	'Tokyo Tachikawa Sunamachi'),
(6,	'user',	'worker5',	'worker5@webmail.co.jp',	'$2y$10$Md8XsrqIneLKHQPJYGnwyeLyMa97A2m6ge84fiRQqBIfdBzC3MMwO',	'09012345678',	'Saitama Kawaguchi Nishikawaguchi'),
(7,	'user',	'worker6',	'worker6@webmail.co.jp',	'$2y$10$Md8XsrqIneLKHQPJYGnwyeLyMa97A2m6ge84fiRQqBIfdBzC3MMwO',	'09012345678',	'Kanagawa Yokohama Hodogaya'),
(8,	'user',	'worker7',	'worker7@webmail.co.jp',	'$2y$10$Md8XsrqIneLKHQPJYGnwyeLyMa97A2m6ge84fiRQqBIfdBzC3MMwO',	'09012345678',	'Chiba Ishikawa Ichikawa'),
(9,	'user',	'worker8',	'worker8@webmail.co.jp',	'$2y$10$0TEOFOeJUVefiaSVZve9wOdXht71uMeVtRk1zdXhC4Sp7qeIpH9jS',	'08012345678',	'Tokyo Sumida Ryogoku');

-- 2021-02-15 01:07:18
