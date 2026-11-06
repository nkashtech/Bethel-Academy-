import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUp, Clock, Mail, Menu, MessageCircle, Monitor, Moon, Phone, Sun, X } from 'lucide-react'
import { nav, school, disclaimer, pathways } from '../content/site'
import { Crest } from './ui'
import { useTheme } from './theme'
import Effects, { smoothTo } from './Effects'
import Intro from './Intro'

function Brand({ light, compact }) {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="Bethel House of God Academy, home">
      <Crest className={`w-auto shrink-0 transition-all duration-500 ease-premium group-hover:-rotate-3 group-hover:scale-105 ${compact ? 'h-11' : 'h-12 sm:h-14'}`} />
      <span className="min-w-0 leading-tight">
        <span className={`block font-serif text-[19px] font-bold sm:text-[22px] ${light ? 'text-white' : 'text-royal-ink'}`}>Bethel House of God Academy</span>
        <span className={`block truncate font-serif text-[13px] italic sm:text-[14px] ${light ? 'text-gold-bright' : 'text-gold-deep'}`}>{school.motto}</span>
      </span>
    </Link>
  )
}

const THEMES = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
]

function ThemeSwitch({ theme, setTheme, className = '' }) {
  return (
    <div role="radiogroup" aria-label="Colour theme" className={`relative flex items-center rounded-full border border-line bg-surface/70 p-1 backdrop-blur ${className}`}>
      <span
        aria-hidden="true"
        className="absolute top-1 h-8 w-8 rounded-full bg-royal shadow-soft transition-transform duration-500 ease-premium dark:bg-gold"
        style={{ transform: `translateX(${THEMES.findIndex((t) => t.id === theme) * 32}px)` }}
      />
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={theme === t.id}
          title={`${t.label} theme`}
          aria-label={`${t.label} theme`}
          onClick={() => setTheme(t.id)}
          className={`relative grid h-8 w-8 place-items-center rounded-full transition-colors ${theme === t.id ? 'text-white dark:text-[#0F2438]' : 'text-ink-muted hover:text-royal-ink'}`}
        >
          <t.icon size={15} />
        </button>
      ))}
    </div>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useTheme()
  const bar = useRef(null)
  const topBtn = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    // Written straight to the DOM so scrolling never re-renders the page.
    const on = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 24)
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      if (topBtn.current) topBtn.current.dataset.on = y > 900 ? 'true' : 'false'
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    // Any element with the "spotlight" class gets a soft gold light that follows the cursor.
    const on = (e) => {
      const el = e.target.closest?.('.spotlight')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', on, { passive: true })
    return () => document.removeEventListener('pointermove', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) window.__lenis?.stop(); else window.__lenis?.start()
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkCls = ({ isActive }) =>
    `relative py-2 text-[14px] font-medium transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:rounded-full after:bg-gold after:transition-transform after:duration-500 after:ease-premium ${isActive ? 'text-royal-text after:scale-x-100' : 'text-ink-soft hover:text-royal-ink after:scale-x-0 hover:after:scale-x-100'}`

  return (
    <div className="flex min-h-screen flex-col">
      <Intro />
      <Effects />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2">Skip to content</a>

      {/* Reading progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold-deep via-gold to-gold-bright" />
      </div>

      {/* Top bar */}
      <div className="hidden bg-royal-night text-[13px] text-white/70 md:block">
        <div className="wrap flex h-10 items-center justify-between gap-6">
          <p className="font-serif text-[15px] italic text-gold-bright">Faith-based Cambridge online tuition · Grade R – Grade 10</p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${school.email}`} className="flex items-center gap-1.5 transition hover:text-white"><Mail size={14} />{school.email}</a>
            <a href={`https://wa.me/${school.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition hover:text-white"><Phone size={14} />{school.phone}</a>
            <span className="hidden items-center gap-1.5 lg:flex"><Clock size={14} />Mon – Fri, 08:00 – 16:00</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all duration-500 ease-premium ${scrolled ? 'border-b border-line/70 bg-canvas/80 shadow-soft backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent bg-canvas'}`}>
        <div className={`wrap flex items-center justify-between gap-4 transition-all duration-500 ease-premium ${scrolled ? 'h-16' : 'h-20'}`}>
          <Brand compact={scrolled} />
          <div className="flex items-center gap-2">
            <ThemeSwitch theme={theme} setTheme={setTheme} className="hidden sm:flex" />
            <Link to="/admissions#consultation" className="btn-outline btn-sm hidden xl:inline-flex">Book a Free Consultation</Link>
            <Link to="/admissions#apply" className="btn-gold btn-sm hidden lg:inline-flex">Enroll Now</Link>
            <button type="button" onClick={() => setOpen(true)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-royal-ink transition hover:border-gold lg:hidden" aria-label="Open menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
        <nav aria-label="Main" className={`hidden overflow-hidden border-t border-line/60 bg-canvas transition-all duration-500 ease-premium lg:block ${scrolled ? 'h-11' : 'h-12'}`}>
          <div className="wrap flex h-full items-center gap-8">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>{n.label}</NavLink>)}
            <Link to="/admissions#consultation" className="ml-auto text-[13px] font-semibold text-gold-deep transition hover:text-royal-ink xl:hidden">Free consultation →</Link>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-royal-night/70 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-canvas shadow-pop transition-transform duration-500 ease-premium ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-line p-4">
            <Crest className="h-12" />
            <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-royal-ink" aria-label="Close menu"><X size={20} /></button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile" data-lenis-prevent>
            {[...nav, { to: '/edubridge', label: 'Edubridge E-Learning' }].map((n, i) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                style={{ transitionDelay: open ? `${120 + i * 45}ms` : '0ms' }}
                className={({ isActive }) => `flex items-center justify-between rounded-2xl px-4 py-3.5 font-serif text-xl font-semibold transition-all duration-500 ease-premium ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'} ${isActive ? 'bg-royal text-white' : 'text-royal-ink hover:bg-royal-soft'}`}
              >
                {n.label}<ArrowRight size={16} className="opacity-50" />
              </NavLink>
            ))}
          </nav>
          <div className="space-y-3 border-t border-line p-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink-muted">Appearance</span>
              <ThemeSwitch theme={theme} setTheme={setTheme} />
            </div>
            <Link to="/admissions#apply" className="btn-gold w-full">Enroll Now</Link>
            <Link to="/admissions#consultation" className="btn-outline w-full">Book a Free Consultation</Link>
          </div>
        </div>
      </div>

      <main id="main" key={pathname} className="flex-1 animate-page-in overflow-x-clip"><Outlet /></main>

      {/* Footer */}
      <footer className="grain relative overflow-hidden bg-royal-night text-white/70">
        <div className="stripes absolute -right-20 top-0 h-full w-1/3 [--stripe:0.06]" />
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-royal/30 blur-3xl" />
        <div className="relative z-[2] border-b border-white/10">
          <div className="wrap flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
            <p className="max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl">
              Real Christian Values, <span className="italic text-gold-bright">Real life Education</span>.
            </p>
            <Link to="/admissions#apply" className="btn-gold shrink-0">Enroll Now <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="wrap relative z-[2] grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Brand light />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed">
              Nurturing the whole child (academically, spiritually and morally) through faith-based, Cambridge-aligned online tuition for families across South Africa.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-[11.5px] font-semibold uppercase tracking-[0.22em] text-gold-bright">Explore</h3>
            <ul className="mt-5 space-y-2.5 text-[14px]">
              {[...nav.slice(1), { to: '/edubridge', label: 'Edubridge E-Learning' }].map((n) => (
                <li key={n.to}><Link to={n.to} className="inline-block transition duration-300 hover:translate-x-1 hover:text-white">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-[11.5px] font-semibold uppercase tracking-[0.22em] text-gold-bright">Learning Pathways</h3>
            <ul className="mt-5 space-y-2.5 text-[14px]">
              {pathways.map((p) => (
                <li key={p.id}><Link to={`/academics#${p.id}`} className="inline-block transition duration-300 hover:translate-x-1 hover:text-white">{p.phase} <span className="text-white/40">· {p.short}</span></Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-[11.5px] font-semibold uppercase tracking-[0.22em] text-gold-bright">Contact Admissions</h3>
            <ul className="mt-5 space-y-3 text-[14px]">
              <li><a href={`mailto:${school.email}`} className="flex items-center gap-2.5 transition hover:text-white"><Mail size={16} className="text-gold" />{school.email}</a></li>
              <li><a href={`https://wa.me/${school.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 transition hover:text-white"><Phone size={16} className="text-gold" />{school.phone}</a></li>
              <li className="flex items-center gap-2.5"><Clock size={16} className="text-gold" />{school.officeHours}</li>
            </ul>
            <Link to="/admissions#consultation" className="btn-outline-light btn-sm mt-6">Book a 15-Minute Zoom Consultation</Link>
          </div>
        </div>
        <div className="relative z-[2] border-t border-white/10">
          <div className="wrap py-8">
            <p className="text-[12.5px] leading-relaxed text-white/55"><strong className="font-semibold text-gold-bright">Legal Disclaimer:</strong> {disclaimer}</p>
            <p className="mt-5 text-[12.5px] text-white/40">© {new Date().getFullYear()} Bethel House of God Academy (BHGA). All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating actions */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-center gap-3">
        <button
          ref={topBtn}
          data-on="false"
          type="button"
          onClick={() => smoothTo(0)}
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-royal-ink shadow-pop backdrop-blur transition-all duration-500 ease-premium hover:border-gold data-[on=false]:pointer-events-none data-[on=false]:translate-y-3 data-[on=false]:opacity-0"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
        <a
          href={`https://wa.me/${school.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-pop transition duration-300 hover:scale-110"
          aria-label="Chat to admissions on WhatsApp"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.5s]" />
          <MessageCircle size={26} className="relative" />
        </a>
      </div>
    </div>
  )
}
