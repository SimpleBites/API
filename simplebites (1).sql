-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Gegenereerd op: 17 mrt 2024 om 11:40
-- Serverversie: 8.0.31
-- PHP-versie: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simplebites`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `comments`
--



DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `recipes`
--

DROP TABLE IF EXISTS `recipes`;
CREATE TABLE IF NOT EXISTS `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `average_score` int DEFAULT NULL,
  `difficulty` varchar(45) DEFAULT NULL,
  `preparation_time` varchar(45) DEFAULT NULL,
  `cooking_time` varchar(45) DEFAULT NULL,
  `instructions` varchar(1000) Default NULL,
  `tools` varchar(1000) DEFAULT NULL,
  `servings` varchar(45) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `recipe_categories`
--

DROP TABLE IF EXISTS `recipe_categories`;
CREATE TABLE IF NOT EXISTS `recipe_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `recipe_ingredients`
--

DROP TABLE IF EXISTS `recipe_ingredients`;
CREATE TABLE IF NOT EXISTS `recipe_ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int DEFAULT NULL,
  `ingredient_id` int DEFAULT NULL,
  `quantity` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id_idx` (`recipe_id`),
  KEY `ingredient_id` (`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `recipe_view_count`
--

DROP TABLE IF EXISTS `recipe_view_count`;
CREATE TABLE IF NOT EXISTS `recipe_view_count` (
  `id` int NOT NULL AUTO_INCREMENT,
  `view_count_total` int DEFAULT NULL,
  `view_count_day` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `recipe_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`)
) ENGINE=Innodb DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `user_image` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `salt` varchar(2000) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `user_image`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'preset.png', 'admin@gmail.com', '$2b$10$UngvSXv5CqepknqVLtGVc.erNGS1DVnQCDsgLJ', NULL, NULL),
(2, 'user', 'preset.png', 'user@gmail.com', 'welkom123', '2024-03-17 11:38:39', '2024-03-17 11:38:39'),
(3, 'jur', 'preset.png', 'jur@gmail.com', 'jur123', '2024-03-17 11:38:39', '2024-03-17 11:38:39');

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `comments`
--
-- Add foreign key constraints to `comments`
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraints to `recipes`
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `recipe_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to `recipe_view_count`
ALTER TABLE `recipe_view_count`
  ADD CONSTRAINT `recipe_view_count_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraints to `recipe_ingredients`
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Committing the transaction (if the autocommit is disabled)
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
