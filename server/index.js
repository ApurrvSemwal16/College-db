const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// ── Dashboard Stats ──────────────────────────────────────────
app.get('/api/stats', async (req, res) => {
  try {
    const [[depts]] = await pool.query('SELECT COUNT(*) as count FROM department');
    const [[instr]] = await pool.query('SELECT COUNT(*) as count FROM instructor');
    const [[courses]] = await pool.query('SELECT COUNT(*) as count FROM course');
    const [[students]] = await pool.query('SELECT COUNT(*) as count FROM student');
    const [[enrollments]] = await pool.query('SELECT COUNT(*) as count FROM enrollment');
    res.json({
      departments: depts.count,
      instructors: instr.count,
      courses: courses.count,
      students: students.count,
      enrollments: enrollments.count,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Departments ──────────────────────────────────────────────
app.get('/api/departments', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.dept_id, d.dept_name,
             i.name AS head_name,
             (SELECT COUNT(*) FROM instructor WHERE dept_id = d.dept_id) AS instructor_count,
             (SELECT COUNT(*) FROM course WHERE dept_id = d.dept_id) AS course_count
      FROM department d
      LEFT JOIN instructor i ON d.head_id = i.instructor_id
      ORDER BY d.dept_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Instructors ──────────────────────────────────────────────
app.get('/api/instructors', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT i.instructor_id, i.name, i.email, d.dept_name,
             (SELECT COUNT(*) FROM course WHERE instructor_id = i.instructor_id) AS course_count,
             CASE WHEN d.head_id = i.instructor_id THEN 'Yes' ELSE 'No' END AS is_head
      FROM instructor i
      JOIN department d ON i.dept_id = d.dept_id
      ORDER BY i.instructor_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Courses ──────────────────────────────────────────────────
app.get('/api/courses', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.course_id, c.course_name, c.credits,
             d.dept_name, i.name AS instructor_name,
             (SELECT COUNT(*) FROM enrollment WHERE course_id = c.course_id) AS student_count
      FROM course c
      JOIN department d ON c.dept_id = d.dept_id
      JOIN instructor i ON c.instructor_id = i.instructor_id
      ORDER BY c.course_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Students ─────────────────────────────────────────────────
app.get('/api/students', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT s.student_id, s.name, s.email, s.phone, s.semester,
             (SELECT COUNT(*) FROM enrollment WHERE student_id = s.student_id) AS courses_enrolled
      FROM student s
      ORDER BY s.student_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Enrollments ──────────────────────────────────────────────
app.get('/api/enrollments', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.enrollment_id, s.name AS student_name, c.course_name,
             d.dept_name, e.enrollment_date, e.grade
      FROM enrollment e
      JOIN student s ON e.student_id = s.student_id
      JOIN course c ON e.course_id = c.course_id
      JOIN department d ON c.dept_id = d.dept_id
      ORDER BY e.enrollment_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 College DB API running on http://localhost:${PORT}`);
});
