import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { smoothTo } from './components/Effects'

// Each page after the home page is its own download.
function page(load) {
  return lazy(() => load().catch((err) => {
    // After a deploy the old file names are gone: reload once to pick up the new ones.
    if (sessionStorage.getItem('chunkRetry')) throw err
    sessionStorage.setItem('chunkRetry', '1')
    window.location.reload()
    return new Promise(() => {})
  }))
}

const About = page(() => import('./pages/About'))
const Academics = page(() => import('./pages/Academics'))
const ExamGuide = page(() => import('./pages/ExamGuide'))
const Fees = page(() => import('./pages/Fees'))
const Edubridge = page(() => import('./pages/Edubridge'))
const Admissions = page(() => import('./pages/Admissions'))
const Admin = page(() => import('./pages/Admin'))
const NotFound = page(() => import('./pages/NotFound'))

const TITLES = {
  '/': 'Bethel House of God Academy',
  '/about': 'About Us',
  '/academics': 'Academics & Programs',
  '/exam-guide': 'Private Candidate & Exam Guide',
  '/fees': 'Tuition & Fees',
  '/edubridge': 'Edubridge E-Learning',
  '/admissions': 'Admissions & Contact',
  '/admin': 'Submissions',
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    sessionStorage.removeItem('chunkRetry')
    const t = TITLES[pathname]
    document.title = t && pathname !== '/' ? `${t} | BHGA` : 'Bethel House of God Academy | Real Christian Values, Real life Education'
    if (hash) {
      // The page may still be loading: try for a moment until the section exists.
      let tries = 0
      const go = () => {
        const el = document.getElementById(hash.slice(1))
        if (el) smoothTo(el)
        else if (tries++ < 20) setTimeout(go, 50)
      }
      go()
    } else {
      window.__lenis?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Lazy><About /></Lazy>} />
          <Route path="academics" element={<Lazy><Academics /></Lazy>} />
          <Route path="exam-guide" element={<Lazy><ExamGuide /></Lazy>} />
          <Route path="fees" element={<Lazy><Fees /></Lazy>} />
          <Route path="edubridge" element={<Lazy><Edubridge /></Lazy>} />
          <Route path="admissions" element={<Lazy><Admissions /></Lazy>} />
          <Route path="*" element={<Lazy><NotFound /></Lazy>} />
        </Route>
        <Route path="admin" element={<Lazy><Admin /></Lazy>} />
      </Routes>
    </>
  )
}

function Lazy({ children }) {
  return <Suspense fallback={<div className="min-h-[60vh]" />}>{children}</Suspense>
}
