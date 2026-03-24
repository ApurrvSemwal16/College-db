# 🎓 College Database Management System

A full-stack web application for managing a college database system, built with **React**, **Express.js**, and **MySQL**. Features an immersive, animated UI powered by [ReactBits](https://reactbits.dev) components.

> **Made by Arav & Apurrv (CS-A)**

---

## 📋 Project Description

A college contains many departments. Each department can offer any number of courses. Many instructors can work in a department, but an instructor can work only in one department. For each department, there is a head, and an instructor can be head of only one department. Each instructor can take any number of courses, and a course can be taken by only one instructor. A student can enrol for any number of courses and each course can have any number of students.

### Database Statistics
| Entity       | Count |
|-------------|-------|
| Departments | 3     |
| Instructors | 6     |
| Courses     | 8     |
| Students    | 15    |
| Enrollments | 30    |

---

## 🏗️ Tech Stack

| Layer      | Technology                          |
|-----------|-------------------------------------|
| **Database** | MySQL 8.0 (`college_db`)         |
| **Backend**  | Node.js + Express.js (REST API)  |
| **Frontend** | React 19 + Vite 6                |
| **Styling**  | Vanilla CSS (Dark Glassmorphism) |
| **Animations** | ReactBits.dev components       |
| **Icons**    | Flaticon Uicons (CDN)            |
| **Font**     | Inter (Google Fonts, Variable)   |

---

## ✨ Frontend Animations (ReactBits)

This project uses multiple components from [reactbits.dev](https://reactbits.dev) to create a premium, immersive user experience:

| Component | Source | Effect |
|-----------|--------|--------|
| **Iridescence** | [reactbits.dev/backgrounds/iridescence](https://reactbits.dev/backgrounds/iridescence) | WebGL-powered swirling iridescent color wave background using OGL |
| **MagicBentoCard** | [reactbits.dev/components/magic-bento](https://reactbits.dev/components/magic-bento) | Mouse-tracking purple border glow on cards using CSS custom properties |
| **TiltedCard** | [reactbits.dev/components/tilted-card](https://reactbits.dev/components/tilted-card) | 3D perspective tilt with spring physics on hover |
| **PillNav** | [reactbits.dev/components/pill-nav](https://reactbits.dev/components/pill-nav) | Pill-shaped navigation with circle expansion hover animation |
| **TextPressure** | [reactbits.dev/text-animations/text-pressure](https://reactbits.dev/text-animations/text-pressure) | Variable font weight changes based on mouse proximity |
| **CountUp** | [reactbits.dev/text-animations/count-up](https://reactbits.dev/text-animations/count-up) | Animated number counting on dashboard stats |
| **GradientText** | [reactbits.dev/text-animations/gradient-text](https://reactbits.dev/text-animations/gradient-text) | Animated gradient text for footer credits |

---

## 🗃️ Database Schema

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│ department  │       │  instructor  │       │   course    │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ dept_id (PK)│◄──────│ dept_id (FK) │       │ course_id(PK│
│ dept_name   │       │ instructor_id│◄──────│ instructor_ │
│ head_id(FK) │──────►│ name         │       │  id (FK)    │
└─────────────┘       │ email        │       │ course_name │
                      └──────────────┘       │ credits     │
                                             │ dept_id (FK)│
                                             └──────┬──────┘
                                                    │
                      ┌──────────────┐       ┌──────┴──────┐
                      │   student    │       │ enrollment  │
                      ├──────────────┤       ├─────────────┤
                      │ student_id(PK│◄──────│ student_id  │
                      │ name         │       │  (FK)       │
                      │ email        │       │ course_id   │
                      │ phone        │       │  (FK)       │
                      │ semester     │       │ enroll_date │
                      └──────────────┘       │ grade       │
                                             └─────────────┘
```

### Entity Relationships
- **Department ↔ Instructor**: One-to-Many (1 dept → many instructors)
- **Department → Head**: One-to-One (1 dept → 1 head instructor)
- **Instructor → Course**: One-to-Many (1 instructor → many courses)
- **Student ↔ Course**: Many-to-Many (via `enrollment` join table)

---

## 🚀 How to Run

### Prerequisites
- **Node.js** (v18+)
- **MySQL** (v8.0+)
- **npm** (comes with Node.js)

### 1. Setup Database
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=college_db
PORT=5000
```

Start the server:
```bash
node index.js
# Server runs on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Open in Browser
Navigate to **http://localhost:5173** to view the application.

---

## 📁 Project Structure

```
College-db/
├── database/
│   ├── schema.sql          # Database tables & constraints
│   └── seed.sql            # Sample data (3 depts, 6 instructors, etc.)
├── server/
│   ├── index.js            # Express.js REST API (6 endpoints)
│   ├── .env                # Database credentials
│   └── package.json
├── client/
│   ├── index.html          # Entry HTML with CDN links
│   ├── vite.config.js      # Vite dev server config
│   ├── src/
│   │   ├── main.jsx        # React entry point
│   │   ├── App.jsx         # Main application component
│   │   ├── index.css       # Complete design system
│   │   └── components/
│   │       ├── Iridescence.jsx     # WebGL background
│   │       ├── MagicBentoCard.jsx  # Mouse-tracking border glow
│   │       ├── TiltedCard.jsx      # 3D perspective tilt
│   │       ├── PillNav.jsx         # Pill navigation
│   │       ├── TextPressure.jsx    # Variable font effect
│   │       ├── CountUp.jsx         # Number animation
│   │       ├── GradientText.jsx    # Gradient text animation
│   │       └── AnimatedList.jsx    # Staggered transitions
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Dashboard counts (depts, instructors, courses, students, enrollments) |
| GET | `/api/departments` | All departments with head name, instructor & course counts |
| GET | `/api/instructors` | All instructors with department and course count |
| GET | `/api/courses` | All courses with department, instructor, and student count |
| GET | `/api/students` | All students with semester and enrolled courses count |
| GET | `/api/enrollments` | All enrollments with student, course, department, and grade |

---

## 📸 Screenshots

### Dashboard
The dashboard displays animated stat cards with 3D tilt effects and mouse-tracking border glow, all over an iridescent WebGL background.

### Navigation
PillNav navigation with circle expansion hover animation and active indicator.

### Data Tables
Clean, responsive data tables for Instructors, Courses, Students, and Enrollments with glassmorphic styling.

---

## 📄 License

This project was created as a college database management system project for academic purposes.
