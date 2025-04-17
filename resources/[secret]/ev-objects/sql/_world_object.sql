-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2024 at 01:14 PM
-- Server version: 11.1.0-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bsrp`
--

-- --------------------------------------------------------

--
-- Table structure for table `_world_object`
--

CREATE TABLE `_world_object` (
  `id` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `ns` varchar(255) NOT NULL,
  `x` int(255) NOT NULL,
  `y` int(255) NOT NULL,
  `z` int(255) NOT NULL,
  `rotX` int(255) NOT NULL,
  `rotY` int(255) NOT NULL,
  `rotZ` int(255) NOT NULL,
  `persistent` varchar(255) NOT NULL,
  `public` longtext DEFAULT NULL,
  `private` longtext DEFAULT NULL,
  `world` varchar(255) NOT NULL,
  `createdAt` int(255) NOT NULL,
  `updatedAt` int(255) DEFAULT NULL,
  `expiresAt` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `_world_object`
--

INSERT INTO `_world_object` (`id`, `model`, `ns`, `x`, `y`, `z`, `rotX`, `rotY`, `rotZ`, `persistent`, `public`, `private`, `world`, `createdAt`, `updatedAt`, `expiresAt`) VALUES
('7d99fcbb-bbe1-4564-8c67-9039197a4b51', '1738496974', 'objects', 1007, 2108, 48, 0, 0, 49, 'dynamic', 'null', 'null', 'default', 1706123244, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `_world_object`
--
ALTER TABLE `_world_object`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
