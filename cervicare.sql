-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table cervicare2.articles
CREATE TABLE IF NOT EXISTS `articles` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','REJECT','APPROVE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_title_key` (`title`),
  KEY `articles_user_id_fkey` (`user_id`),
  CONSTRAINT `articles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.articles: ~2 rows (approximately)
INSERT INTO `articles` (`id`, `title`, `content`, `status`, `thumbnail`, `user_id`, `created_at`, `updated_at`) VALUES
	('dc550232-8591-410f-aea5-5944b0b0e1ca', 'Gejala kanker serviks', 'Kanker serviks stadium awal kemungkinan besar tidak ada gejala. Adapun gejala kanker serviks yang lebih dari stadium 1 ditandai oleh beberapa ciri, seperti: \r\n\r\n1.Keputihan dalam jumlah yang banyak dan berbau\r\n2.Perdarahan vagina ketika melakukan hubungan seksual (contact bleeding)\r\n3.Perdarahan tidak wajar dari vagina padahal sedang tidak haid\r\n4.Siklus menstruasi tidak teratur dan cenderung menjadi lebih panjang \r\n5.Rasa sakit pada panggul (di perut bagian bawah), pinggang (punggung bawah) atau kaki.\r\n6.Hilangnya nafsu makan sehingga menyebabkan berat badan menurun \r\n7.Badan terasam lemas dan mudah lelah \r\n\r\nJangan mengabaikan gejala yang muncul karena bisa memperburuk kondisi sehingga Sahabat MIKA bisa kehilangan kehilangan kesempatan untuk memperoleh perawatan yang efektif. ', 'PENDING', NULL, 'd579b3f2-5f2a-4c84-bffe-2c79bf524dba', '2023-12-07 22:43:11.395', '2023-12-07 22:43:11.393'),
	('fcfa414b-dbc1-4a99-8710-63e7de4f9052', 'Apa itu kanker serviks?', 'Kanker serviks atau nama lainnya kanker leher rahim, merupakan suatu keganasan yang tumbuh pada sel-sel di leher rahim. Serviks sendiri terletak di sepertiga bagian bawah uterus, berbentuk silindris dan menonjol.\r\n\r\nSebagian besar kasus kanker leher rahim disebabkan oleh adanya infeksi dari virus Human Papilloma Virus (HPV) yang dapat ditularkan melalui hubungan seksual. \r\n\r\nSaat seseorang terkena HPV, sistem kekebalan tubuh sebenarnya bisa mencegah virus agar tidak membahayakan. \r\n\r\nSayangnya, pada sebagian orang lainnya, virus ini bertahan selama bertahun-tahun sehingga menyebabkan sejumlah sel serviks menjadi sel kanker.\r\n\r\nInilah pentingnya bagi Sahabat MIKA menerima vaksin yang dapat melindungi diri dari infeksi HPV. ', 'PENDING', NULL, 'd579b3f2-5f2a-4c84-bffe-2c79bf524dba', '2023-12-07 22:42:08.376', '2023-12-12 16:56:40.472');

-- Dumping structure for table cervicare2.chats
CREATE TABLE IF NOT EXISTS `chats` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `doctor_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chats_user_id` (`user_id`),
  KEY `chats_doctor_id` (`doctor_id`),
  CONSTRAINT `chats_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chats_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table cervicare2.chats: ~0 rows (approximately)

-- Dumping structure for table cervicare2.doctors
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `registration_certificate` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `work_lifetime` mediumint NOT NULL DEFAULT '0',
  `practice_location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alumnus` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `doctors_user_id_unique` (`user_id`),
  KEY `doctors_user_id` (`user_id`),
  CONSTRAINT `doctors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `role_users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.doctors: ~1 rows (approximately)
INSERT INTO `doctors` (`id`, `registration_certificate`, `work_lifetime`, `practice_location`, `alumnus`, `user_id`) VALUES
	('b89787fa-648f-461f-aa91-4d93aadf2db9', 'STR1000', 1, 'Jakarta', 'UI', 'ec3a1fe1-6516-4c27-9bb5-e4c25b2b328c');

-- Dumping structure for table cervicare2.doctor_ratings
CREATE TABLE IF NOT EXISTS `doctor_ratings` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int unsigned NOT NULL DEFAULT '0',
  `user_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `doctor_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_ratings_user_id` (`user_id`),
  KEY `doctor_ratings_doctor_id` (`doctor_id`),
  CONSTRAINT `doctor_ratings_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_ratings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.doctor_ratings: ~0 rows (approximately)

-- Dumping structure for table cervicare2.facility_link
CREATE TABLE IF NOT EXISTS `facility_link` (
  `health_facility_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public_facility_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `facility_link_health_facility_id_public_facility_id_key` (`health_facility_id`,`public_facility_id`),
  KEY `facility_link_public_facility_id_fkey` (`public_facility_id`),
  CONSTRAINT `facility_link_health_facility_id_fkey` FOREIGN KEY (`health_facility_id`) REFERENCES `health_facilities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `facility_link_public_facility_id_fkey` FOREIGN KEY (`public_facility_id`) REFERENCES `public_facilities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.facility_link: ~1 rows (approximately)
INSERT INTO `facility_link` (`health_facility_id`, `public_facility_id`) VALUES
	('07b6ff15-a179-4cbb-aa49-3f116601afac', '7e0d6b06-17c7-471e-a500-c33c606a6e05');

-- Dumping structure for table cervicare2.facility_location
CREATE TABLE IF NOT EXISTS `facility_location` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `health_facility_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `regency` varchar(160) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(160) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `urban_village` varchar(160) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rural` varchar(160) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(8,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `facility_location_health_facility_id_key` (`health_facility_id`),
  CONSTRAINT `facility_location_health_facility_id_fkey` FOREIGN KEY (`health_facility_id`) REFERENCES `health_facilities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.facility_location: ~1 rows (approximately)
INSERT INTO `facility_location` (`id`, `health_facility_id`, `address`, `province`, `city`, `regency`, `district`, `urban_village`, `rural`, `latitude`, `longitude`) VALUES
	('0a3e634f-f2c8-4ea8-9fa7-d433d5ae89f4', '07b6ff15-a179-4cbb-aa49-3f116601afac', 'asd', 'sdasd', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- Dumping structure for table cervicare2.health_facilities
CREATE TABLE IF NOT EXISTS `health_facilities` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `open_hour` int NOT NULL,
  `close_hour` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.health_facilities: ~1 rows (approximately)
INSERT INTO `health_facilities` (`id`, `name`, `type`, `photo`, `open_hour`, `close_hour`) VALUES
	('07b6ff15-a179-4cbb-aa49-3f116601afac', 'Klinik Ibunda', 'Klinik', NULL, 1702022400, 1702036800),
	('de502345-e13b-46be-93b7-5eb6952c1af6', 'RS Ganda Husada', 'Rumah Sakit', NULL, 1702022400, 1702036800);

-- Dumping structure for table cervicare2.medical_collaboration
CREATE TABLE IF NOT EXISTS `medical_collaboration` (
  `health_facility_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `medical_facility_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `medical_collaboration_health_facility_id_medical_facility_id_key` (`health_facility_id`,`medical_facility_id`),
  KEY `medical_collaboration_medical_facility_id_fkey` (`medical_facility_id`),
  CONSTRAINT `medical_collaboration_health_facility_id_fkey` FOREIGN KEY (`health_facility_id`) REFERENCES `health_facilities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `medical_collaboration_medical_facility_id_fkey` FOREIGN KEY (`medical_facility_id`) REFERENCES `medical_facilities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.medical_collaboration: ~0 rows (approximately)

-- Dumping structure for table cervicare2.medical_facilities
CREATE TABLE IF NOT EXISTS `medical_facilities` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.medical_facilities: ~0 rows (approximately)

-- Dumping structure for table cervicare2.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount_paid` int NOT NULL DEFAULT '0',
  `payment_url` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('PENDING','FAILED','PAID','EXPIRED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `doctor_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id` (`user_id`),
  KEY `orders_doctor_id` (`doctor_id`),
  CONSTRAINT `orders_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.orders: ~0 rows (approximately)

-- Dumping structure for table cervicare2.public_facilities
CREATE TABLE IF NOT EXISTS `public_facilities` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.public_facilities: ~1 rows (approximately)
INSERT INTO `public_facilities` (`id`, `name`) VALUES
	('7e0d6b06-17c7-471e-a500-c33c606a6e05', 'parkir umum');

-- Dumping structure for table cervicare2.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.roles: ~2 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
	('f1b51f70-9816-452c-99c6-894cd8d43480', 'user', '2023-12-07 18:21:34.000', '2023-12-07 18:21:35.000'),
	('f1b51f70-9816-452c-99c6-894cd8d43482', 'doctor', '2023-12-07 18:21:34.000', '2023-12-07 18:21:35.000');

-- Dumping structure for table cervicare2.role_users
CREATE TABLE IF NOT EXISTS `role_users` (
  `role_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `role_users_user_id_unique` (`user_id`) USING BTREE,
  KEY `role_users_role_id` (`role_id`) USING BTREE,
  KEY `role_users_user_id` (`user_id`) USING BTREE,
  CONSTRAINT `role_users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.role_users: ~2 rows (approximately)
INSERT INTO `role_users` (`role_id`, `user_id`) VALUES
	('f1b51f70-9816-452c-99c6-894cd8d43482', 'ec3a1fe1-6516-4c27-9bb5-e4c25b2b328c');

-- Dumping structure for table cervicare2.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(160) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_picture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('MALE','FEMALE') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cervicare2.users: ~3 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `profile_picture`, `birth_date`, `gender`, `phone`, `created_at`, `updated_at`) VALUES
	('d579b3f2-5f2a-4c84-bffe-2c79bf524dba', 'Ratna', 'ratna@gmail.com', '$2b$10$IKv5CwA7IePszKeiWH8DIONgaOBdHDr2riYkudtj2DEF53Fo9oHAq', NULL, NULL, 'FEMALE', NULL, '2023-12-07 20:43:27.526', '2023-12-07 22:25:41.357'),
	('ec3a1fe1-6516-4c27-9bb5-e4c25b2b328c', 'Dr. Anastasya', 'anastasya@gmail.com', '$2b$10$jrAAhAE8YsC9ztk6MNTS/Oahxdfoj/QbMRbbeuZick1CSJwd3y/Y6', NULL, NULL, NULL, NULL, '2023-12-20 11:22:41.337', '2023-12-20 11:22:41.335');

-- Dumping structure for table cervicare2.user_otp
CREATE TABLE IF NOT EXISTS `user_otp` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp` int NOT NULL DEFAULT '0',
  `expiry_time` bigint NOT NULL DEFAULT '0',
  `is_verified` enum('YES','NO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NO',
  `user_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_otp_user_id` (`user_id`),
  CONSTRAINT `user_otp_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table cervicare2.user_otp: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
