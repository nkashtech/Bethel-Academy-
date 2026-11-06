import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Archive, ArrowRight, Award, Blocks, BookOpen, BookOpenText, Calculator, Check, ChevronRight, Circle, ClipboardCheck, Compass,
  FlaskConical, Globe2, Heart, Landmark, Languages, Laptop, LayoutDashboard, Library, MapPin, MonitorPlay, PenLine, ShieldCheck, Video,
} from 'lucide-react'

// Icons named in content/site.js. Listed one by one so the build only ships these, not the whole set.
const ICONS = {
  Archive, Award, Blocks, BookOpen, BookOpenText, Calculator, ClipboardCheck, Compass, FlaskConical, Globe2, Heart,
  Landmark, Languages, Laptop, LayoutDashboard, Library, MapPin, MonitorPlay, PenLine, ShieldCheck, Video,
}

export function Icon({ name, ...props }) {
  const C = ICONS[name] || Circle
  return <C {...props} />
}

export function Crest({ className = '' }) {
  return <img src="/crest.png" alt="Bethel House of God Academy crest" className={className} draggable="false" />
}

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// True once the element has scrolled into view.
export function useInView(options = { rootMargin: '0px 0px -10% 0px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } }, options)
    io.observe(el)
    return () => io.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, inView]
}

// A gold hand-drawn stroke under a word. It draws itself in.
export function Swash({ className = '', delay = 900 }) {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path d="M4 17C58 7 132 3 206 6c34 1.4 64 4.5 90 9" fill="none" stroke="#D4A853" strokeWidth="5" strokeLinecap="round" strokeDasharray="320" className="animate-draw" style={{ animationDelay: `${delay}ms` }} />
      <path d="M40 21c60-6 128-8 196-4" fill="none" stroke="#D4A853" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" strokeDasharray="320" className="animate-draw" style={{ animationDelay: `${delay + 250}ms` }} />
    </svg>
  )
}

// Fades a block in once it scrolls into view. from: up | left | right | scale | blur
export function Reveal({ as: Tag = 'div', delay = 0, from = 'up', className = '', style, children, ...rest }) {
  const [ref, shown] = useInView()
  return (
    <Tag ref={ref} data-from={from} data-shown={shown} style={{ transitionDelay: `${delay}ms`, ...style }} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

// Splits a headline into words that rise in one after another.
export function Words({ text, start = 0, step = 70, className = '' }) {
  return text.split(' ').map((w, i) => (
    <span key={`${w}-${i}`} className="inline-block animate-word-in" style={{ animationDelay: `${start + i * step}ms` }}>
      {/* The inner span carries any styling with its own animation (such as gold foil). */}
      <span className={className}>{w}</span>{'\u00A0'}
    </span>
  ))
}

// A card with a soft gold light that follows the cursor (Layout tracks the pointer for every .spotlight).
export function Spotlight({ as: Tag = 'div', className = '', children, ...rest }) {
  return <Tag className={`spotlight ${className}`} {...rest}>{children}</Tag>
}

// Counts up to a number when it scrolls into view. prefix/suffix stay put, e.g. R2,800.
export function Counter({ to, prefix = '', suffix = '', duration = 1400, className = '' }) {
  const [ref, seen] = useInView({ rootMargin: '0px' })
  // Wait for the intro curtain, if it's playing, so the count is seen.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!seen) return
    const check = () => (document.documentElement.classList.contains('intro-on') ? setTimeout(check, 200) : setReady(true))
    const t = setTimeout(check, 0)
    return () => clearTimeout(t)
  }, [seen])
  const inView = seen && ready
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduced()) { setN(to); return }
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])
  return <span ref={ref} className={className}>{prefix}{n.toLocaleString('en-ZA').replace(/ |\s/g, ',')}{suffix}</span>
}

// An endless ribbon of words. Pauses under the cursor.
export function Marquee({ items, className = '' }) {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-serif text-2xl font-semibold italic sm:text-3xl">
          {t}<span className="text-base not-italic text-gold">✦</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className={`group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}>
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">{row(false)}{row(true)}</div>
    </div>
  )
}

// A small gold flourish between eyebrow and title.
export function Ornament({ className = '' }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-center gap-2 text-gold ${className}`}>
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
      <span className="text-[10px]">✦</span>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
    </span>
  )
}

export function SectionHead({ eyebrow, title, children, center, light, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal from="blur">
          <p className={light ? 'eyebrow-light' : 'eyebrow'}>{!center && <span className="h-px w-8 bg-current" />}{eyebrow}</p>
          {center && <Ornament className="mt-2" />}
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className={`mt-3 font-serif text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-[3.4rem] ${light ? 'text-white' : 'text-royal-ink'}`}>{title}</h2>
      </Reveal>
      {children && <Reveal delay={160}><p className={`mt-5 text-[17px] leading-relaxed ${light ? 'text-white/75' : 'text-ink-soft'}`}>{children}</p></Reveal>}
    </div>
  )
}

// Royal-blue banner at the top of every inner page.
export function PageHero({ eyebrow, title, subtitle, crumb, children, photo }) {
  return (
    <section className="grain relative overflow-hidden bg-royal text-white dark:bg-royal-deep">
      <div className="stripes absolute inset-y-0 right-0 w-1/2 [--stripe:0.2] [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-royal-night/50 blur-3xl" />
      <GoldFlakes count={14} seed={11} className="z-[1]" />
      <div className="wrap relative z-[2] grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:py-24">
        <div>
          <nav aria-label="Breadcrumb" className="flex animate-fade-up items-center gap-1.5 text-[13px] text-white/60">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gold-bright">{crumb || title}</span>
          </nav>
          {eyebrow && <p className="eyebrow-light mt-6 animate-fade-up [animation-delay:80ms]"><span className="h-px w-8 bg-current" />{eyebrow}</p>}
          <h1 className="mt-3 font-serif text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
            <Words text={title} start={120} step={55} />
          </h1>
          {subtitle && <p className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/80 [animation-delay:450ms]">{subtitle}</p>}
          {children && <div className="animate-fade-up [animation-delay:600ms]">{children}</div>}
        </div>
        {photo && (
          <div className="relative hidden h-80 animate-fade-up [animation-delay:300ms] lg:block">
            <div className="absolute right-4 top-0 h-80 w-60 animate-drift overflow-hidden rounded-full border-4 border-gold/80 bg-gold shadow-pop">
              <img src={photo} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute right-56 top-16 grid h-56 w-40 animate-drift place-items-center overflow-hidden rounded-full border-4 border-gold/60 bg-paper shadow-pop [animation-delay:-3.5s]">
              <Crest className="w-28" />
            </div>
            <div className="absolute right-0 top-2 h-16 w-16 animate-spin-slow rounded-full border border-dashed border-gold/60" />
          </div>
        )}
      </div>
      <svg className="absolute -bottom-px left-0 z-[2] h-10 w-full text-canvas" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40V22C240 2 480 0 720 12s480 26 720 6v22z" fill="currentColor" />
      </svg>
    </section>
  )
}

export function CheckList({ items, light, className = '' }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t, i) => (
        <Reveal as="li" from="left" delay={i * 70} key={t} className="flex gap-3">
          <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${light ? 'bg-gold text-[#0F2438]' : 'bg-gold-soft text-gold-deep'}`}>
            <Check size={14} strokeWidth={3} />
          </span>
          <span className={light ? 'text-white/85' : 'text-ink-soft'}>{t}</span>
        </Reveal>
      ))}
    </ul>
  )
}

export function Field({ label, required, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="label">{label}{required && <span className="text-gold-deep"> *</span>}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-muted">{hint}</span>}
    </label>
  )
}

// A hidden field people never see. Bots fill it in, so the API ignores those submissions.
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>Leave this empty<input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} name="website" /></label>
    </div>
  )
}

export function CtaBand() {
  return (
    <section className="wrap py-24">
      <Reveal from="scale" className="grain relative overflow-hidden rounded-[2.75rem] bg-royal-night px-6 py-16 text-center text-white shadow-pop sm:px-14 sm:py-20">
        <div className="stripes absolute inset-0 [--stripe:0.1]" />
        <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl" />
        <GoldFlakes count={16} seed={5} className="z-[1]" />
        <div className="relative z-[2] mx-auto max-w-2xl">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-paper shadow-glow"><Crest className="w-16" /></div>
          <h2 className="mt-7 font-serif text-4xl font-semibold leading-tight sm:text-[3.4rem]">Begin your child's journey to academic &amp; character <span className="foil italic">excellence</span></h2>
          <p className="mt-4 text-white/75">Speak to our admissions coordinator, or start the application today.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/admissions#apply" className="btn-gold">Enroll Now <ArrowRight size={16} /></Link>
            <Link to="/admissions#consultation" className="btn-outline-light">Book a Free Consultation</Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// Gold leaf flakes drifting and turning, like the confetti in a luxury product reveal.
export function GoldFlakes({ count = 18, seed = 1, className = '' }) {
  const flakes = useMemo(() => {
    let s = seed * 9301
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
    return Array.from({ length: count }, () => ({
      left: rnd() * 100, top: rnd() * 100, size: 6 + rnd() * 16, delay: -rnd() * 12, dur: 9 + rnd() * 10, rot: rnd() * 360, o: 0.35 + rnd() * 0.6, shape: rnd() > 0.5,
    }))
  }, [count, seed])
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {flakes.map((f, i) => (
        <span key={i} className="absolute animate-flake" style={{ left: `${f.left}%`, top: `${f.top}%`, animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s`, opacity: f.o }}>
          <svg width={f.size} height={f.size} viewBox="0 0 20 20" style={{ animationDelay: `${f.delay * 0.7}s`, animationDuration: `${6 + (f.rot % 8)}s` }} className="animate-flake-spin">
            <defs>
              <linearGradient id={`fg${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#F3D58C" /><stop offset=".5" stopColor="#D4A853" /><stop offset="1" stopColor="#9C7228" />
              </linearGradient>
            </defs>
            {f.shape
              ? <path d="M2 6 L11 1 L18 8 L14 18 L4 15 Z" fill={`url(#fg${i})`} />
              : <path d="M10 1 C14 5 19 8 17 12 C15 17 7 19 3 15 C0 11 5 5 10 1 Z" fill={`url(#fg${i})`} />}
          </svg>
        </span>
      ))}
    </div>
  )
}
