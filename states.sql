-- MySQL dump 10.13  Distrib 5.5.50, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: svnit_hackathon_aug16
-- ------------------------------------------------------
-- Server version	5.5.50-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `States`
--

DROP TABLE IF EXISTS `States`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `States` (
  `id` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `input` varchar(50) NOT NULL,
  `nextStateId` varchar(50) DEFAULT NULL,
  `promptAudioId` varchar(50) DEFAULT NULL,
  `output` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`input`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `States`
--

LOCK TABLES `States` WRITE;
/*!40000 ALTER TABLE `States` DISABLE KEYS */;
INSERT INTO `States` VALUES ('decide subject prompt','Deciding the subject to study','*','decide subject response post','decide subject prompt.wav',NULL),('decide subject response post','Deciding the subject to study','1','physics decide lesson prompt',NULL,'voidivr'),('decide subject response post','Deciding the subject to study','2','chemistry decide lesson prompt',NULL,'voidivr'),('physics decide lesson prompt','Deciding the lesson to study','*','physics decide lesson response post','decide lesson prompt.wav',NULL),('physics decide lesson response post','Deciding the lesson to study','0',NULL,NULL,'voidvoicemail'),('physics decide lesson response post','Deciding the lesson to study','1','physics lesson 1 decide page prompt',NULL,'voidivr'),('physics lesson 1 decide page prompt','Deciding the page to study','*','physics lesson 1 page response post','decide page.wav',NULL),('physics lesson 1 decide page response post','Deciding the page to study','1','physics lesson 1 page 1',NULL,'voidvoicemail'),('physics lesson 1 decide page response post','Deciding the page to study','2','physics lesson 1 page 2',NULL,'voidvoicemail'),('physics lesson 1 decide page response post','Deciding the page to study','3','physics lesson 1 page 3',NULL,'voidvoicemail'),('start','The first state','*','decide subject prompt','start.wav',NULL);
/*!40000 ALTER TABLE `States` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-14  2:39:09
