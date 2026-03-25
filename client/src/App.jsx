import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import CountUp from './components/CountUp'
import GradientText from './components/GradientText'
import { AnimatedRow, AnimatedTbody, AnimatedCard } from './components/AnimatedList'
import Iridescence from './components/Iridescence'
import MagicBentoCard from './components/MagicBentoCard'
import TiltedCard from './components/TiltedCard'
import PillNav from './components/PillNav'
import TextPressure from './components/TextPressure'

const API_BASE = '/api'

/* Flaticon Uicons helper */
function Icon({ name, className = '' }) {
  return <i className={`fi ${name} ${className}`} />
}

const TABS = [
  { id: 'dashboard',   label: 'Dashboard',    icon: 'fi-sr-chart-pie-alt' },
  { id: 'departments', label: 'Departments',  icon: 'fi-sr-building' },
  { id: 'instructors', label: 'Instructors',  icon: 'fi-sr-chalkboard-user' },
  { id: 'courses',     label: 'Courses',      icon: 'fi-sr-book-alt' },
  { id: 'students',    label: 'Students',     icon: 'fi-sr-graduation-cap' },
  { id: 'enrollments', label: 'Enrollments',  icon: 'fi-sr-clipboard-list-check' },
]

/* ── Helpers ──────────────────────────────────────────────── */
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

function Loading() {
  return (
    <motion.div
      className="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="spinner" />
      <span className="loading-text">Loading data…</span>
    </motion.div>
  )
}

function ErrorMsg({ message }) {
  return <div className="error">⚠️ Failed to load data: {message}</div>
}

function gradeClass(grade) {
  if (!grade) return ''
  const first = grade.charAt(0).toUpperCase()
  if (first === 'A') return 'grade-a'
  if (first === 'B') return 'grade-b'
  if (first === 'C') return 'grade-c'
  return 'grade-d'
}

/* ── Page transition wrapper ──────────────────────────────── */
function PageTransition({ children, tabKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Dashboard ────────────────────────────────────────────── */
function Dashboard() {
  const { data, loading, error } = useFetch(`${API_BASE}/stats`)
  if (loading) return <Loading />
  if (error) return <ErrorMsg message={error} />

  const items = [
    { icon: 'fi-sr-building', label: 'Departments',  count: data.departments, color: '#6366f1' },
    { icon: 'fi-sr-chalkboard-user', label: 'Instructors',  count: data.instructors, color: '#06b6d4' },
    { icon: 'fi-sr-book-alt', label: 'Courses',      count: data.courses, color: '#f59e0b' },
    { icon: 'fi-sr-graduation-cap', label: 'Students',     count: data.students, color: '#10b981' },
    { icon: 'fi-sr-clipboard-list-check', label: 'Enrollments',  count: data.enrollments, color: '#8b5cf6' },
  ]

  return (
    <div className="stats-grid">
      {items.map((it, i) => (
        <AnimatedCard className="stat-card-wrapper" key={it.label} delay={i * 0.08}>
          <TiltedCard rotateAmplitude={12} scaleOnHover={1.05}>
            <MagicBentoCard className="stat-card">
              <div className="stat-icon" style={{ color: it.color }}><Icon name={it.icon} /></div>
              <div className="stat-number" style={{ color: it.color }}>
                <CountUp to={it.count} duration={1.6} delay={i * 0.1} />
              </div>
              <div className="stat-label">{it.label}</div>
            </MagicBentoCard>
          </TiltedCard>
        </AnimatedCard>
      ))}
    </div>
  )
}

/* ── Departments ──────────────────────────────────────────── */
function Departments() {
  const { data, loading, error } = useFetch(`${API_BASE}/departments`)
  if (loading) return <Loading />
  if (error) return <ErrorMsg message={error} />

  const icons = ['fi-sr-laptop', 'fi-sr-calculator', 'fi-sr-atom']

  return (
    <div className="dept-grid">
      {data.map((d, i) => (
        <AnimatedCard className="dept-card-wrapper" key={d.dept_id} delay={i * 0.1}>
          <TiltedCard rotateAmplitude={10} scaleOnHover={1.04}>
            <MagicBentoCard className="dept-card">
              <h3>
                <span className="dept-icon"><Icon name={icons[i] || 'fi-sr-building'} /></span>
                {d.dept_name}
              </h3>
              <div className="dept-meta">
                <div className="dept-meta-item">
                  <span className="meta-icon"><Icon name="fi-sr-crown" /></span>
                  <span>Head: <strong>{d.head_name || 'N/A'}</strong></span>
                </div>
                <div className="dept-meta-item">
                  <span className="meta-icon"><Icon name="fi-sr-users-alt" /></span>
                  <span>Instructors: <strong>{d.instructor_count}</strong></span>
                </div>
                <div className="dept-meta-item">
                  <span className="meta-icon"><Icon name="fi-sr-book-alt" /></span>
                  <span>Courses: <strong>{d.course_count}</strong></span>
                </div>
              </div>
            </MagicBentoCard>
          </TiltedCard>
        </AnimatedCard>
      ))}
    </div>
  )
}

/* ── Instructors ──────────────────────────────────────────── */
function Instructors() {
  const { data, loading, error } = useFetch(`${API_BASE}/instructors`)
  if (loading) return <Loading />
  if (error) return <ErrorMsg message={error} />

  return (
    <div className="table-container">
      <div className="table-header">
        <h2><Icon name="fi-sr-chalkboard-user" /> Instructors <span className="count-badge">{data.length}</span></h2>
      </div>
      <div className="table-scroll">
        <table className="data-table" id="instructors-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Courses</th><th>Dept Head</th>
            </tr>
          </thead>
          <AnimatedTbody>
            {data.map((r) => (
              <AnimatedRow key={r.instructor_id}>
                <td>{r.instructor_id}</td>
                <td><strong>{r.name}</strong></td>
                <td style={{ color: 'var(--text-secondary)' }}>{r.email}</td>
                <td><span className="badge badge-dept">{r.dept_name}</span></td>
                <td>{r.course_count}</td>
                <td>
                  {r.is_head === 'Yes' ? (
                    <span className="badge badge-head"><Icon name="fi-sr-crown" /> Head</span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                  )}
                </td>
              </AnimatedRow>
            ))}
          </AnimatedTbody>
        </table>
      </div>
    </div>
  )
}

/* ── Courses ──────────────────────────────────────────────── */
function Courses() {
  const { data, loading, error } = useFetch(`${API_BASE}/courses`)
  if (loading) return <Loading />
  if (error) return <ErrorMsg message={error} />

  return (
    <div className="table-container">
      <div className="table-header">
        <h2><Icon name="fi-sr-book-alt" /> Courses <span className="count-badge">{data.length}</span></h2>
      </div>
      <div className="table-scroll">
        <table className="data-table" id="courses-table">
          <thead>
            <tr>
              <th>ID</th><th>Course Name</th><th>Credits</th><th>Department</th><th>Instructor</th><th>Students</th>
            </tr>
          </thead>
          <AnimatedTbody>
            {data.map((r) => (
              <AnimatedRow key={r.course_id}>
                <td>{r.course_id}</td>
                <td><strong>{r.course_name}</strong></td>
                <td><span className="badge badge-credits">{r.credits} cr</span></td>
                <td><span className="badge badge-dept">{r.dept_name}</span></td>
                <td>{r.instructor_name}</td>
                <td>{r.student_count}</td>
              </AnimatedRow>
            ))}
          </AnimatedTbody>
        </table>
      </div>
    </div>
  )
}

/* ── Students ─────────────────────────────────────────────── */
function Students() {
  const { data, loading, error } = useFetch(`${API_BASE}/students`)
  if (loading) return <Loading />
  if (error) return <ErrorMsg message={error} />

  return (
    <div className="table-container">
      <div className="table-header">
        <h2><Icon name="fi-sr-graduation-cap" /> Students <span className="count-badge">{data.length}</span></h2>
      </div>
      <div className="table-scroll">
        <table className="data-table" id="students-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Semester</th><th>Courses</th>
            </tr>
          </thead>
          <AnimatedTbody>
            {data.map((r) => (
              <AnimatedRow key={r.student_id}>
                <td>{r.student_id}</td>
                <td><strong>{r.name}</strong></td>
                <td style={{ color: 'var(--text-secondary)' }}>{r.email}</td>
                <td>{r.phone}</td>
                <td><span className="badge badge-semester">Sem {r.semester}</span></td>
                <td>{r.courses_enrolled}</td>
              </AnimatedRow>
            ))}
          </AnimatedTbody>
        </table>
      </div>
    </div>
  )
}

/* ── Enrollments ──────────────────────────────────────────── */
function Enrollments() {
  const { data, loading, error } = useFetch(`${API_BASE}/enrollments`)
  if (loading) return <Loading />
  if (error) return <ErrorMsg message={error} />

  return (
    <div className="table-container">
      <div className="table-header">
        <h2><Icon name="fi-sr-clipboard-list-check" /> Enrollments <span className="count-badge">{data.length}</span></h2>
      </div>
      <div className="table-scroll">
        <table className="data-table" id="enrollments-table">
          <thead>
            <tr>
              <th>#</th><th>Student</th><th>Course</th><th>Department</th><th>Date</th><th>Grade</th>
            </tr>
          </thead>
          <AnimatedTbody>
            {data.map((r) => (
              <AnimatedRow key={r.enrollment_id}>
                <td>{r.enrollment_id}</td>
                <td><strong>{r.student_name}</strong></td>
                <td>{r.course_name}</td>
                <td><span className="badge badge-dept">{r.dept_name}</span></td>
                <td style={{ color: 'var(--text-secondary)' }}>
                  {new Date(r.enrollment_date).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </td>
                <td>
                  {r.grade ? (
                    <span className={`badge badge-grade ${gradeClass(r.grade)}`}>{r.grade}</span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                  )}
                </td>
              </AnimatedRow>
            ))}
          </AnimatedTbody>
        </table>
      </div>
    </div>
  )
}

/* ── Main App ─────────────────────────────────────────────── */
const PAGE_MAP = {
  dashboard: Dashboard,
  departments: Departments,
  instructors: Instructors,
  courses: Courses,
  students: Students,
  enrollments: Enrollments,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const Page = PAGE_MAP[activeTab]

  return (
    <div className="app">
      {/* Iridescence animated background */}
      <div className="hyperspeed-bg">
        <Iridescence />
      </div>

      <motion.header
        className="header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <TextPressure
          text="College Database"
          textColor="#000000"
          minWeight={100}
          maxWeight={900}
          className="title-pressure"
        />
        <p className="header-tagline">Manage departments, instructors, courses, students &amp; enrollments</p>
      </motion.header>

      <PillNav
        items={TABS}
        activeId={activeTab}
        onSelect={setActiveTab}
      />

      <main>
        <PageTransition tabKey={activeTab}>
          <Page />
        </PageTransition>
      </main>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="footer-content">
          <span className="footer-made">Made by</span>
          <GradientText
            colors={['#6366f1', '#ec4899', '#8b5cf6', '#6366f1']}
            animationSpeed={4}
            className="footer-names"
          >
            Arav &amp; Apurrv
          </GradientText>
          <span className="footer-section">(CS-A)</span>
        </div>
        <div className="footer-sub">
          Powered by <a href="https://reactbits.dev" target="_blank" rel="noopener">ReactBits</a> · MySQL · Express · React
        </div>
      </motion.footer>
    </div>
  )
}
