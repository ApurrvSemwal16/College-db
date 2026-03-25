USE college_db;

-- 3 Departments (head_id set to NULL initially, updated below)

INSERT INTO department (dept_name) VALUES
('Computer Science'),
('Mathematics'),
('Physics');

-- 6 Instructors (2 per department)

INSERT INTO instructor (name, email, dept_id) VALUES
('Dr. Ananya Sharma',    'ananya.sharma@college.edu',    1),
('Prof. Rajesh Kumar',   'rajesh.kumar@college.edu',     1),
('Dr. Priya Mehta',      'priya.mehta@college.edu',      2),
('Prof. Suresh Iyer',    'suresh.iyer@college.edu',      2),
('Dr. Kavita Reddy',     'kavita.reddy@college.edu',     3),
('Prof. Amit Patel',     'amit.patel@college.edu',       3);

-- Assign department heads (one instructor heads one department)
UPDATE department SET head_id = 1 WHERE dept_id = 1;  -- Dr. Ananya Sharma heads CS
UPDATE department SET head_id = 3 WHERE dept_id = 2;  -- Dr. Priya Mehta heads Math
UPDATE department SET head_id = 5 WHERE dept_id = 3;  -- Dr. Kavita Reddy heads Physics

-- 8 Courses

INSERT INTO course (course_name, credits, dept_id, instructor_id) VALUES
('Data Structures & Algorithms',  4, 1, 1),
('Database Management Systems',   4, 1, 2),
('Operating Systems',             3, 1, 1),
('Linear Algebra',                3, 2, 3),
('Probability & Statistics',      3, 2, 4),
('Calculus II',                   4, 2, 3),
('Classical Mechanics',           4, 3, 5),
('Quantum Physics',               3, 3, 6);

-- 15 Students

INSERT INTO student (name, email, phone, semester) VALUES
('Aarav Verma',       'aarav.verma@student.edu',       '9876543210', 3),
('Diya Nair',         'diya.nair@student.edu',         '9876543211', 5),
('Ishaan Gupta',      'ishaan.gupta@student.edu',      '9876543212', 1),
('Meera Joshi',       'meera.joshi@student.edu',       '9876543213', 3),
('Rohan Deshmukh',    'rohan.deshmukh@student.edu',    '9876543214', 7),
('Sanya Kapoor',      'sanya.kapoor@student.edu',      '9876543215', 5),
('Vivaan Singh',      'vivaan.singh@student.edu',      '9876543216', 1),
('Anvi Chakraborty',  'anvi.chakraborty@student.edu',  '9876543217', 3),
('Kabir Malhotra',    'kabir.malhotra@student.edu',    '9876543218', 5),
('Tara Bhat',         'tara.bhat@student.edu',         '9876543219', 7),
('Arjun Pillai',      'arjun.pillai@student.edu',      '9876543220', 1),
('Riya Saxena',       'riya.saxena@student.edu',       '9876543221', 3),
('Kian Choudhury',    'kian.choudhury@student.edu',    '9876543222', 5),
('Nisha Agarwal',     'nisha.agarwal@student.edu',     '9876543223', 7),
('Dev Thakur',        'dev.thakur@student.edu',        '9876543224', 1);

-- 30 Enrollments (each student gets 2 courses)

INSERT INTO enrollment (student_id, course_id, enrollment_date, grade) VALUES
(1,  1, '2025-07-15', 'A'),
(1,  4, '2025-07-15', 'B+'),
(2,  2, '2025-07-16', 'A+'),
(2,  7, '2025-07-16', 'A'),
(3,  1, '2025-07-17', 'B'),
(3,  5, '2025-07-17', 'A'),
(4,  3, '2025-07-18', 'B+'),
(4,  6, '2025-07-18', 'A'),
(5,  2, '2025-07-19', 'A'),
(5,  8, '2025-07-19', 'B'),
(6,  1, '2025-07-20', 'A+'),
(6,  4, '2025-07-20', 'A'),
(7,  3, '2025-07-21', 'C+'),
(7,  7, '2025-07-21', 'B+'),
(8,  5, '2025-07-22', 'A'),
(8,  2, '2025-07-22', 'B+'),
(9,  6, '2025-07-23', 'A'),
(9,  8, '2025-07-23', 'A+'),
(10, 1, '2025-07-24', 'B'),
(10, 7, '2025-07-24', 'A'),
(11, 4, '2025-07-25', 'B+'),
(11, 3, '2025-07-25', 'A'),
(12, 5, '2025-07-26', 'A'),
(12, 2, '2025-07-26', 'A+'),
(13, 6, '2025-07-27', 'B'),
(13, 8, '2025-07-27', 'A'),
(14, 1, '2025-07-28', 'A'),
(14, 7, '2025-07-28', 'B+'),
(15, 3, '2025-07-29', 'B'),
(15, 5, '2025-07-29', 'A');
