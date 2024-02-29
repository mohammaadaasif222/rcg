-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: gurunanak2024
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(45) DEFAULT NULL,
  `classvalue` varchar(45) DEFAULT NULL,
  `section` varchar(45) DEFAULT NULL,
  `english` varchar(45) DEFAULT NULL,
  `science` varchar(45) DEFAULT NULL,
  `physics` varchar(45) DEFAULT NULL,
  `chemistry` varchar(45) DEFAULT NULL,
  `punjabi` varchar(45) DEFAULT NULL,
  `computer` varchar(45) DEFAULT NULL,
  `drawing` varchar(45) DEFAULT NULL,
  `physical` varchar(255) DEFAULT 'no',
  `social_science` varchar(255) DEFAULT 'no',
  `hindi` varchar(255) DEFAULT 'no',
  `math` varchar(255) DEFAULT 'no',
  PRIMARY KEY (`class_id`),
  UNIQUE KEY `class_name_UNIQUE` (`class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'1','first','A','yes','no','no','no','no','yes','no','no','no','no','no'),(10,'9','ninth','B','yes','yes','yes','yes','no','no','no','no','no','no','no'),(18,'11','eleven','A','yes','yes','yes','yes','no','no','no','no','no','no','no'),(20,'13','nursery','A','yes','yes','yes','yes','no','yes','no','no','no','no','no');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eleven_a_biodata`
--

DROP TABLE IF EXISTS `eleven_a_biodata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eleven_a_biodata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adm_no` varchar(255) DEFAULT NULL,
  `Roll_No` varchar(255) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `gurdian_name` varchar(255) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `attendance_term_1` varchar(255) DEFAULT NULL,
  `max_meeting_term_1` varchar(255) DEFAULT NULL,
  `attendance_term_2` varchar(255) DEFAULT NULL,
  `max_meeting_term_2` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `vision_l` varchar(255) DEFAULT NULL,
  `vision_r` varchar(255) DEFAULT NULL,
  `admin_category` varchar(255) DEFAULT NULL,
  `reservation_category` varchar(255) DEFAULT NULL,
  `sgc` varchar(255) DEFAULT NULL,
  `bpl` varchar(255) DEFAULT NULL,
  `diffrently_abled` varchar(255) DEFAULT NULL,
  `teacher_ward` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `quota` varchar(255) DEFAULT NULL,
  `date_of_admission` varchar(255) DEFAULT NULL,
  `tc_issued` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eleven_a_biodata`
--

LOCK TABLES `eleven_a_biodata` WRITE;
/*!40000 ALTER TABLE `eleven_a_biodata` DISABLE KEYS */;
INSERT INTO `eleven_a_biodata` VALUES (1,'1111','22121','aasif','2022-02-18','marc','annie','09634135114','Male','vill alipur gajraula','amroha','India','244235','','','','','','','','','','','','','','','','','','',''),(2,'1000011','567','aasif','2024-02-08','psdfd','annie','09634135114','Male','vill alipur gajraula','amroha','India','244235','','','','','','','','','','','','','','','','','','','');
/*!40000 ALTER TABLE `eleven_a_biodata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eleven_a_english`
--

DROP TABLE IF EXISTS `eleven_a_english`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eleven_a_english` (
  `adm_no` varchar(45) NOT NULL,
  `subject` varchar(45) DEFAULT NULL,
  `pt1_max` double DEFAULT NULL,
  `pt1_obtain` double DEFAULT NULL,
  `pt1_outOf` double DEFAULT NULL,
  `pt1_total_marks` double DEFAULT NULL,
  `half_yearly_max` double DEFAULT NULL,
  `half_yearly_obtain` double DEFAULT NULL,
  `half_yearly_outOf` double DEFAULT NULL,
  `pt2_max` double DEFAULT NULL,
  `pt2_obtain` double DEFAULT NULL,
  `pt2_outOf` double DEFAULT NULL,
  `pt2_total_marks` double DEFAULT NULL,
  `annual_max` double DEFAULT NULL,
  `annual_obtain` double DEFAULT NULL,
  `annual_outOf` double DEFAULT NULL,
  `overall_grade` varchar(45) DEFAULT NULL,
  `overall` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`adm_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eleven_a_english`
--

LOCK TABLES `eleven_a_english` WRITE;
/*!40000 ALTER TABLE `eleven_a_english` DISABLE KEYS */;
INSERT INTO `eleven_a_english` VALUES ('1000011','englsih',7,6,10,0,0,4,7,6,9,7,0,6,8,6,'E',''),('1111','english',7,6,10,0,0,4,7,6,9,7,0,6,8,6,'E',NULL);
/*!40000 ALTER TABLE `eleven_a_english` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eleven_a_total`
--

DROP TABLE IF EXISTS `eleven_a_total`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eleven_a_total` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adm_no` varchar(45) NOT NULL,
  `science` float DEFAULT NULL,
  `physics` float DEFAULT NULL,
  `chemistry` float DEFAULT NULL,
  `pt1_max` float DEFAULT NULL,
  `pt1_obtain` float DEFAULT NULL,
  `pt1_outOf` float DEFAULT NULL,
  `pt1_total_marks` float DEFAULT NULL,
  `half_yearly_max` float DEFAULT NULL,
  `half_yearly_obtain` float DEFAULT NULL,
  `half_yearly_outOf` float DEFAULT NULL,
  `pt2_max` float DEFAULT NULL,
  `pt2_obtain` float DEFAULT NULL,
  `pt2_outOf` float DEFAULT NULL,
  `pt2_total_marks` float DEFAULT NULL,
  `annual_max` float DEFAULT NULL,
  `annual_obtain` float DEFAULT NULL,
  `annual_outOf` float DEFAULT NULL,
  `overall` float DEFAULT NULL,
  `overall_grade` varchar(45) DEFAULT NULL,
  `t1_english` float DEFAULT NULL,
  `t2_english` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eleven_a_total`
--

LOCK TABLES `eleven_a_total` WRITE;
/*!40000 ALTER TABLE `eleven_a_total` DISABLE KEYS */;
INSERT INTO `eleven_a_total` VALUES (1,'1111',27,NULL,NULL,7,6,10,0,0,4,7,6,9,7,0,6,8,6,NULL,'E',NULL,NULL);
/*!40000 ALTER TABLE `eleven_a_total` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fifth_b_total`
--

DROP TABLE IF EXISTS `fifth_b_total`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fifth_b_total` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adm_no` varchar(45) NOT NULL,
  `t1_hindi` float DEFAULT NULL,
  `t2_hindi` float DEFAULT NULL,
  `t1_computer` float DEFAULT NULL,
  `t2_computer` float DEFAULT NULL,
  `t1_drawing` float DEFAULT NULL,
  `t2_drawing` float DEFAULT NULL,
  `t1_physical` float DEFAULT NULL,
  `t2_physical` float DEFAULT NULL,
  `t1_total` float DEFAULT NULL,
  `t2_total` float DEFAULT NULL,
  `t1_percentage` float DEFAULT NULL,
  `t2_percentage` float DEFAULT NULL,
  `t1_grade` varchar(45) DEFAULT NULL,
  `t2_grade` varchar(45) DEFAULT NULL,
  `t1_scholastic_computer` varchar(45) DEFAULT NULL,
  `t1_scholastic_drawing` varchar(45) DEFAULT NULL,
  `t1_scholastic_gk` varchar(45) DEFAULT NULL,
  `t1_scholastic_deciplin` varchar(45) DEFAULT NULL,
  `t1_scholastic_remark` varchar(45) DEFAULT NULL,
  `t1_scholastic_entery` varchar(45) DEFAULT NULL,
  `t2_scholastic_workeducation` varchar(45) DEFAULT NULL,
  `t2_scholastic_art` varchar(45) DEFAULT NULL,
  `t2_scholastic_health` varchar(45) DEFAULT NULL,
  `t2_scholastic_deciplin` varchar(45) DEFAULT NULL,
  `t2_scholastic_remark` varchar(45) DEFAULT NULL,
  `t2_scholastic_entery` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fifth_b_total`
--

LOCK TABLES `fifth_b_total` WRITE;
/*!40000 ALTER TABLE `fifth_b_total` DISABLE KEYS */;
/*!40000 ALTER TABLE `fifth_b_total` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `first_a_biodata`
--

DROP TABLE IF EXISTS `first_a_biodata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `first_a_biodata` (
  `adm_no` varchar(255) DEFAULT NULL,
  `id` varchar(255) DEFAULT NULL,
  `Roll_No` varchar(255) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `gurdian_name` varchar(255) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `attendance_term_1` varchar(255) DEFAULT NULL,
  `max_meeting_term_1` varchar(255) DEFAULT NULL,
  `attendance_term_2` varchar(255) DEFAULT NULL,
  `max_meeting_term_2` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `vision_l` varchar(255) DEFAULT NULL,
  `vision_r` varchar(255) DEFAULT NULL,
  `admin_category` varchar(255) DEFAULT NULL,
  `reservation_category` varchar(255) DEFAULT NULL,
  `sgc` varchar(255) DEFAULT NULL,
  `bpl` varchar(255) DEFAULT NULL,
  `diffrently_abled` varchar(255) DEFAULT NULL,
  `teacher_ward` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `quota` varchar(255) DEFAULT NULL,
  `date_of_admission` varchar(255) DEFAULT NULL,
  `tc_issued` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `first_a_biodata`
--

LOCK TABLES `first_a_biodata` WRITE;
/*!40000 ALTER TABLE `first_a_biodata` DISABLE KEYS */;
INSERT INTO `first_a_biodata` VALUES ('123','1','1','abc','11/30/2022','fghkkkk','avfbg','852365','Male','bhnm,','jbknm,','gjbknlm','513','300','','200','','','','','','II','GEN','sgc','ews','yes','yes','Hindu','BPL','11/30/2022','',''),('456','2','2','def','11/30/2022','fghkkkk','avfbg','852365','Female','bhnm,','jbknm,','gjbknlm','513','300','','200','','','','','','I','SC','','bpl','yes','yes','Sikh','','11/30/2022','',''),('789','3','3','ghi','11/30/2022','fghkkkk','avfbg','852365','Female','bhnm,','jbknm,','gjbknlm','513','300','','200','','','','','','II','OBC','sgc','bpl','yes','yes','Muslim','BPL','11/30/2022','',''),('9909','4','4','asif','11/30/2022','mohammad','marrie','852365','Male','mohali','mohali','india','513','300','','200','','','','','','II','OBC','sgc','bpl','yes','yes','Muslim','BPL','11/30/2022','',''),('789349','5','5','meer','11/30/2022','mohammad','marrie','852365','Female','chandigarh','mohali','india','513','300','','200','','','','','','II','OBC','sgc','bpl','yes','yes','Muslim','BPL','11/30/2022','',''),('9999999','6','6',',msdj','12/1/2022','ert','rtet','89080453','male','chandigarh','','','','','','','','','','','','','','','','','','','','','',''),('9084','7','7','abc','11/30/2022','fghkkkk','baljheet','852365','Male','bhnm,','jbknm,','gjbknlm','513','300','','200','','','','','','II','GEN','sgc','ews','yes','yes','Hindu','BPL','11/30/2022','','');
/*!40000 ALTER TABLE `first_a_biodata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `first_a_english`
--

DROP TABLE IF EXISTS `first_a_english`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `first_a_english` (
  `adm_no` varchar(255) DEFAULT NULL,
  `id` varchar(255) DEFAULT NULL,
  `pen_paper_term1_pt1` varchar(255) DEFAULT NULL,
  `multiple_assessment_term1_pt1` varchar(255) DEFAULT NULL,
  `pen_paper_term1_pt2` varchar(255) DEFAULT NULL,
  `multiple_assessment_term1_pt2` varchar(255) DEFAULT NULL,
  `pen_paper_term1_pt3` varchar(255) DEFAULT NULL,
  `multiple_assessment_term1_pt3` varchar(255) DEFAULT NULL,
  `best_of_two_term1` varchar(255) DEFAULT NULL,
  `weightage_term1` varchar(255) DEFAULT NULL,
  `portfoilo_term1` varchar(255) DEFAULT NULL,
  `sub_enrich_act_term1` varchar(255) DEFAULT NULL,
  `hly_exam_term1` varchar(255) DEFAULT NULL,
  `total_marks_term_1` varchar(255) DEFAULT NULL,
  `final_grade_term_1` varchar(255) DEFAULT NULL,
  `pen_paper_term2_pt1` varchar(255) DEFAULT NULL,
  `multiple_assessment_term2_pt1` varchar(255) DEFAULT NULL,
  `pen_paper_term2_pt2` varchar(255) DEFAULT NULL,
  `multiple_assessment_term2_pt2` varchar(255) DEFAULT NULL,
  `pen_paper_term2_pt3` varchar(255) DEFAULT NULL,
  `multiple_assessment_term2_pt3` varchar(255) DEFAULT NULL,
  `best_of_two_term2` varchar(255) DEFAULT NULL,
  `weightage_term2` varchar(255) DEFAULT NULL,
  `portfoilo_term2` varchar(255) DEFAULT NULL,
  `sub_enrich_act_term2` varchar(255) DEFAULT NULL,
  `annual_exam` varchar(255) DEFAULT NULL,
  `total_marks_term_2` varchar(255) DEFAULT NULL,
  `final_grade_term_2` varchar(255) DEFAULT NULL,
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `first_a_english`
--

LOCK TABLES `first_a_english` WRITE;
/*!40000 ALTER TABLE `first_a_english` DISABLE KEYS */;
INSERT INTO `first_a_english` VALUES ('123','1','2','2','2','2','2','3','9','20','2','2','43','67.00','B2','2','1','2','2','1','2','8','0','3','2','33','38.00','D'),('456','2','3','2','3','1','1','4','10','3','2','2','2','40','D','3','5','6','4','5','5','20','0','5','55','55','115','E'),('789','3','3','2','3','1','1','4','10','3','2','2','2','40','D','3','5','6','4','5','5','20','0','5','55','55','115','E');
/*!40000 ALTER TABLE `first_a_english` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `first_a_total`
--

DROP TABLE IF EXISTS `first_a_total`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `first_a_total` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adm_no` varchar(45) NOT NULL,
  `t1_computer` float DEFAULT NULL,
  `t2_computer` float DEFAULT NULL,
  `t1_english` float DEFAULT NULL,
  `t2_english` float DEFAULT NULL,
  `t1_total` float DEFAULT NULL,
  `t2_total` float DEFAULT NULL,
  `t1_percentage` float DEFAULT NULL,
  `t2_percentage` float DEFAULT NULL,
  `t1_grade` varchar(45) DEFAULT NULL,
  `t2_grade` varchar(45) DEFAULT NULL,
  `t1_scholastic_computer` varchar(45) DEFAULT NULL,
  `t1_scholastic_drawing` varchar(45) DEFAULT NULL,
  `t1_scholastic_gk` varchar(45) DEFAULT NULL,
  `t1_scholastic_deciplin` varchar(45) DEFAULT NULL,
  `t1_scholastic_remark` varchar(45) DEFAULT NULL,
  `t1_scholastic_entery` varchar(45) DEFAULT NULL,
  `t2_scholastic_workeducation` varchar(45) DEFAULT NULL,
  `t2_scholastic_art` varchar(45) DEFAULT NULL,
  `t2_scholastic_health` varchar(45) DEFAULT NULL,
  `t2_scholastic_deciplin` varchar(45) DEFAULT NULL,
  `t2_scholastic_remark` varchar(45) DEFAULT NULL,
  `t2_scholastic_entery` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `first_a_total`
--

LOCK TABLES `first_a_total` WRITE;
/*!40000 ALTER TABLE `first_a_total` DISABLE KEYS */;
INSERT INTO `first_a_total` VALUES (1,'123',40,30,67,38,200,129,56,65,'B2','D','A','C','C','B','D','B','B','B','A','A','B','B');
/*!40000 ALTER TABLE `first_a_total` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `first_b_biodata`
--

DROP TABLE IF EXISTS `first_b_biodata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `first_b_biodata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adm_no` varchar(255) DEFAULT NULL,
  `Roll_No` varchar(255) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `gurdian_name` varchar(255) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `attendance_term_1` varchar(255) DEFAULT NULL,
  `max_meeting_term_1` varchar(255) DEFAULT NULL,
  `attendance_term_2` varchar(255) DEFAULT NULL,
  `max_meeting_term_2` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `vision_l` varchar(255) DEFAULT NULL,
  `vision_r` varchar(255) DEFAULT NULL,
  `admin_category` varchar(255) DEFAULT NULL,
  `reservation_category` varchar(255) DEFAULT NULL,
  `sgc` varchar(255) DEFAULT NULL,
  `bpl` varchar(255) DEFAULT NULL,
  `diffrently_abled` varchar(255) DEFAULT NULL,
  `teacher_ward` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `quota` varchar(255) DEFAULT NULL,
  `date_of_admission` varchar(255) DEFAULT NULL,
  `tc_issued` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `first_b_biodata`
--

LOCK TABLES `first_b_biodata` WRITE;
/*!40000 ALTER TABLE `first_b_biodata` DISABLE KEYS */;
INSERT INTO `first_b_biodata` VALUES (1,'789','789','aasif','2015-08-06','moh','marry','09634135114','Male','vill alipur gajraula','amroha','India','244235','','','','','','','','','','','','','','','','','','',''),(2,'456','456','aasif','2024-02-06','moh','marry','09634135114','Male','vill alipur gajraula','amroha','India','244235','','','','','','','','','','','','','','','','','','','');
/*!40000 ALTER TABLE `first_b_biodata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ninth_b_biodata`
--

DROP TABLE IF EXISTS `ninth_b_biodata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ninth_b_biodata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adm_no` varchar(255) DEFAULT NULL,
  `Roll_No` varchar(255) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `gurdian_name` varchar(255) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `attendance_term_1` varchar(255) DEFAULT NULL,
  `max_meeting_term_1` varchar(255) DEFAULT NULL,
  `attendance_term_2` varchar(255) DEFAULT NULL,
  `max_meeting_term_2` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `vision_l` varchar(255) DEFAULT NULL,
  `vision_r` varchar(255) DEFAULT NULL,
  `admin_category` varchar(255) DEFAULT NULL,
  `reservation_category` varchar(255) DEFAULT NULL,
  `sgc` varchar(255) DEFAULT NULL,
  `bpl` varchar(255) DEFAULT NULL,
  `diffrently_abled` varchar(255) DEFAULT NULL,
  `teacher_ward` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `quota` varchar(255) DEFAULT NULL,
  `date_of_admission` varchar(255) DEFAULT NULL,
  `tc_issued` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ninth_b_biodata`
--

LOCK TABLES `ninth_b_biodata` WRITE;
/*!40000 ALTER TABLE `ninth_b_biodata` DISABLE KEYS */;
INSERT INTO `ninth_b_biodata` VALUES (1,'456','456','aasif','2024-02-16','moh','marry','09634135114','Male','vill alipur gajraula','amroha','India','244235','','','','','','','','','','','','','','','','','','','');
/*!40000 ALTER TABLE `ninth_b_biodata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ninth_b_english`
--

DROP TABLE IF EXISTS `ninth_b_english`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ninth_b_english` (
  `adm_no` varchar(45) NOT NULL,
  `pt1` double DEFAULT NULL,
  `pt2` double DEFAULT NULL,
  `pt3` double DEFAULT NULL,
  `multiple_assessment` double DEFAULT NULL,
  `best_of_two` double DEFAULT NULL,
  `portfolio` int DEFAULT NULL,
  `sub_enrich_act` int DEFAULT NULL,
  `annual_exam` double DEFAULT NULL,
  `total_marks` double DEFAULT NULL,
  `final_grade` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`adm_no`),
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ninth_b_english`
--

LOCK TABLES `ninth_b_english` WRITE;
/*!40000 ALTER TABLE `ninth_b_english` DISABLE KEYS */;
INSERT INTO `ninth_b_english` VALUES ('456',3,4,4,3,4,5,3,33,13,'E');
/*!40000 ALTER TABLE `ninth_b_english` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ninth_b_total`
--

DROP TABLE IF EXISTS `ninth_b_total`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ninth_b_total` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adm_no` varchar(45) NOT NULL,
  `english` float DEFAULT NULL,
  `science` float DEFAULT NULL,
  `physics` float DEFAULT NULL,
  `chemistry` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  `grade` varchar(45) DEFAULT NULL,
  `art` varchar(45) DEFAULT NULL,
  `computer` varchar(45) DEFAULT NULL,
  `health` varchar(45) DEFAULT NULL,
  `gk` varchar(45) DEFAULT NULL,
  `deciplin` varchar(45) DEFAULT NULL,
  `workeducation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ninth_b_total`
--

LOCK TABLES `ninth_b_total` WRITE;
/*!40000 ALTER TABLE `ninth_b_total` DISABLE KEYS */;
INSERT INTO `ninth_b_total` VALUES (1,'456',13,NULL,NULL,NULL,13,NULL,'B','C','D','D','B','B');
/*!40000 ALTER TABLE `ninth_b_total` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nursery`
--

DROP TABLE IF EXISTS `nursery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nursery` (
  `adm_no` text,
  `t1_english_pronunciation` text,
  `t1_english_fluency` text,
  `t1_english_comprehension` text,
  `t1_english_creative_writing` text,
  `t1_english_handwriting` text,
  `t1_english_grammar` text,
  `t1_english_spelling` text,
  `t1_english_vocabulary` text,
  `t1_english_conversation` text,
  `t1_english_recitation` text,
  `t1_english_listening_comprehension` text,
  `t2_english_pronunciation` text,
  `t2_english_fluency` text,
  `t2_english_comprehension` text,
  `t2_english_creative_writing` text,
  `t2_english_handwriting` text,
  `t2_english_grammar` text,
  `t2_english_spelling` text,
  `t2_english_vocabulary` text,
  `t2_english_conversation` text,
  `t2_english_recitation` text,
  `t2_english_listening_comprehension` text,
  `t1_punjabi_pronunciation` text,
  `t1_punjabi_fluency` text,
  `t1_punjabi_comprehension` text,
  `t1_punjabi_creative_writing` text,
  `t1_punjabi_handwriting` text,
  `t1_punjabi_grammar` text,
  `t1_punjabi_spelling` text,
  `t1_punjabi_vocabulary` text,
  `t1_punjabi_conversation` text,
  `t1_punjabi_recitation` text,
  `t1_punjabi_listening_comprehension` text,
  `t2_punjabi_pronunciation` text,
  `t2_punjabi_fluency` text,
  `t2_punjabi_comprehension` text,
  `t2_punjabi_creative_writing` text,
  `t2_punjabi_handwriting` text,
  `t2_punjabi_grammar` text,
  `t2_punjabi_spelling` text,
  `t2_punjabi_vocabulary` text,
  `t2_punjabi_conversation` text,
  `t2_punjabi_recitation` text,
  `t2_punjabi_listening_comprehension` text,
  `t1_mathematics_concept` text,
  `t1_mathematics_activity` text,
  `t1_mathematics_tables` text,
  `t1_mathematics_mental_ability` text,
  `t2_mathematics_concept` text,
  `t2_mathematics_activity` text,
  `t2_mathematics_tables` text,
  `t2_mathematics_mental_ability` text,
  `t1_health_environment` text,
  `t1_health_sensitivity` text,
  `t1_health_activity` text,
  `t1_health_group_discussion` text,
  `t2_health_environment` text,
  `t2_health_sensitivity` text,
  `t2_health_activity` text,
  `t2_health_group_discussion` text,
  `t1_games_enthusiasm` text,
  `t1_games_discipline` text,
  `t1_games_team_spirit` text,
  `t1_games_talent` text,
  `t2_games_enthusiasm` text,
  `t2_games_discipline` text,
  `t2_games_team_spirit` text,
  `t2_games_talent` text,
  `t1_art_interest` text,
  `t1_art_creativity` text,
  `t1_art_skill` text,
  `t2_art_interest` text,
  `t2_art_creativity` text,
  `t2_art_skill` text,
  `t1_music_interest` text,
  `t1_music_rhythm` text,
  `t1_music_melody` text,
  `t2_music_interest` text,
  `t2_music_rhythm` text,
  `t2_music_melody` text,
  `t1_personality_courteousness` text,
  `t1_personality_confidence` text,
  `t1_personality_care_of_belonging` text,
  `t1_personality_neatness` text,
  `t1_personality_regularity` text,
  `t1_personality_initiative` text,
  `t1_personality_self_control` text,
  `t1_personality_respect` text,
  `t1_personality_sharing` text,
  `t2_personality_courteousness` text,
  `t2_personality_confidence` text,
  `t2_personality_care_of_belonging` text,
  `t2_personality_neatness` text,
  `t2_personality_regularity` text,
  `t2_personality_initiative` text,
  `t2_personality_self_control` text,
  `t2_personality_respect` text,
  `t2_personality_sharing` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nursery`
--

LOCK TABLES `nursery` WRITE;
/*!40000 ALTER TABLE `nursery` DISABLE KEYS */;
INSERT INTO `nursery` VALUES ('1720A','a','a','b','c','d','b','c','d','a','d','c','b','c','da','d','c','b','c','d','a','d','c','b','c','d','a','d','c','b','c','d','a','d','c','b','c','d','a','d','c','b','c','d','a','d','c','b','c','da','ds','cb','c','d','a','dsc','b','c','d','a','d','c','b','c','d','a','d','c','b','c','d','a','ds','c','b','c','daz','d','c','b','c','d','d','cb','c','d','a','dc','b','cd','a','dc','bc','d','ad','c','bc','d','ad'),('45698','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','A','B','C','D','B','C','D','A','C','D','E','A','D','E','A','B','B','C','D','A','C','D','A','B','D','E','A','E','A','B','A','B','C','B','C','D','D','E','A','B','C','D','E','A','B','E','A','B','C','D','E','A','B','C'),('2222','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','E','A','B','C','D','A','B','C','D','B','C','D','A','C','D','E','A','D','E','A','B','B','C','D','A','C','D','A','B','D','E','A','E','A','B','A','B','C','B','C','D','D','E','A','B','C','D','E','A','B','E','A','B','C','D','E','A','B','C');
/*!40000 ALTER TABLE `nursery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nursery_a_biodata`
--

DROP TABLE IF EXISTS `nursery_a_biodata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nursery_a_biodata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adm_no` varchar(255) DEFAULT NULL,
  `Roll_No` varchar(255) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `gurdian_name` varchar(255) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `attendance_term_1` varchar(255) DEFAULT NULL,
  `max_meeting_term_1` varchar(255) DEFAULT NULL,
  `attendance_term_2` varchar(255) DEFAULT NULL,
  `max_meeting_term_2` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `vision_l` varchar(255) DEFAULT NULL,
  `vision_r` varchar(255) DEFAULT NULL,
  `admin_category` varchar(255) DEFAULT NULL,
  `reservation_category` varchar(255) DEFAULT NULL,
  `sgc` varchar(255) DEFAULT NULL,
  `bpl` varchar(255) DEFAULT NULL,
  `diffrently_abled` varchar(255) DEFAULT NULL,
  `teacher_ward` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `quota` varchar(255) DEFAULT NULL,
  `date_of_admission` varchar(255) DEFAULT NULL,
  `tc_issued` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adm_no` (`adm_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nursery_a_biodata`
--

LOCK TABLES `nursery_a_biodata` WRITE;
/*!40000 ALTER TABLE `nursery_a_biodata` DISABLE KEYS */;
INSERT INTO `nursery_a_biodata` VALUES (1,'45698','89000','aasif','2024-02-16','psdfd','32mkldfglk','09634135114','Male','vill alipur gajraula','amroha','India','244235','','','','','','','','','','','','','','','','','','',''),(2,'2222','4345','edwrf','2024-02-23','asd','sad','09634135114','Male','vill alipur gajraula','amroha','India','244235','','','','','','','','','','','','','','','','','','','');
/*!40000 ALTER TABLE `nursery_a_biodata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salaries`
--

DROP TABLE IF EXISTS `salaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salaries` (
  `employee_id` int NOT NULL,
  `name` text NOT NULL,
  `contact` bigint NOT NULL,
  `bank_details` text NOT NULL,
  `pay_month` text NOT NULL,
  `salary` int NOT NULL,
  `allowance` int DEFAULT NULL,
  `absents` int DEFAULT NULL,
  `deductions` int DEFAULT NULL,
  `bonus` int DEFAULT NULL,
  `net_salary` double NOT NULL,
  `payment_date` text NOT NULL,
  `position` varchar(45) NOT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salaries`
--

LOCK TABLES `salaries` WRITE;
/*!40000 ALTER TABLE `salaries` DISABLE KEYS */;
INSERT INTO `salaries` VALUES (1,'parth panchal',9729150403,'9894358032489980','jan',2000000,3,2,133333,1,1866667.67,'2024-02-24T07:02:44.136Z','teacher'),(8,'mohmmad aasif',9729150403,'ac8908328-08342','apr',10002,3,2,667,0,9336.2,'2024-02-23T12:13:37.291Z','teacher');
/*!40000 ALTER TABLE `salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `teacher_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `imagename` varchar(255) DEFAULT NULL,
  `incharge` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` text,
  `phone` bigint DEFAULT NULL,
  `address` text,
  `branch` varchar(45) DEFAULT NULL,
  `about` text,
  PRIMARY KEY (`teacher_id`),
  UNIQUE KEY `incharge_UNIQUE` (`incharge`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'parth panchal','a1.jpg',NULL,'admin','parth@gmail.com','parth',9729150403,'kurukshetra','mohali','legendary developer'),(2,'pankaj chodhary','Screenshot 2024-02-01 225204.png','null','teacher','pankaj@gmail.com','pankaj',NULL,'zirakpur','panchkula','bad '),(8,'mohmmad aasif','user.webp',NULL,'admin','tubedev87@gmail.com','123456',NULL,'vill alipur gajraula','mohali','');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-26 17:14:28
