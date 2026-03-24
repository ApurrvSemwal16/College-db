-- College Database Schema
DROP DATABASE IF EXISTS college_db;
CREATE DATABASE college_db;
USE college_db;

-- Department table
CREATE TABLE department (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    head_id INT UNIQUE DEFAULT NULL
);

-- Instructor table
CREATE TABLE instructor (
    instructor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    dept_id INT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id) ON DELETE CASCADE
);

-- Add FK for department head after instructor table exists
ALTER TABLE department
    ADD CONSTRAINT fk_head
    FOREIGN KEY (head_id) REFERENCES instructor(instructor_id) ON DELETE SET NULL;

-- Course table
CREATE TABLE course (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(150) NOT NULL,
    credits INT NOT NULL DEFAULT 3,
    dept_id INT NOT NULL,
    instructor_id INT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id) ON DELETE CASCADE
);

-- Student table
CREATE TABLE student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15),
    semester INT NOT NULL DEFAULT 1
);

-- Enrollment table (M:N between Student and Course)
CREATE TABLE enrollment (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    grade VARCHAR(2) DEFAULT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id)
);
