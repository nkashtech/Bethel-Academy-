import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { home, photos } from '../content/site'
import { Crest, GoldFlakes } from './ui'
import { smoothTo } from './Effects'
import { useIsDark } from './theme'

// One chapter per step of the "4 simple steps" from the brief.
const CHAPTERS = [
  { word: 'Begin', tag: 'Beginning', photo: 'girlLaptop', dark: true },
  { word: 'Learn', tag: 'Learning', photo: 'girlsTablet', dark: false },
  { word: 'Grow', tag: 'Growing', photo: 'boysBackpacks', dark: true },
  { word: 'Prepare', tag: 'Preparation', photo: 'boyWriting', dark: false },
].map((c, i) => ({ ...c, ...home.steps[i] }))

// A word split into letters that rise out of a mask when its chapter arrives.
function BigWord({ text, on, outline }) {
  // The outline's stroke colour comes from the parent's text colour, read through --stroke.
  return (
    <span className="flex justify-center overflow-hidden whitespace-nowrap leading-[0.82]" aria-hidden={outline || undefined}>
      {text.toUpperCase().split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-[900ms] ease-premium"
          style={{
            transform: on ? 'translateY(0)' : 'translateY(105%)',
            transitionDelay: on ? `${120 + i * 45}ms` : '0ms',
            ...(outline ? { WebkitTextStroke: '1.5px var(--stroke)', color: 'transparent' } : {}),
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

// Pinned, full-screen scroll story: the giant word sits behind the photo and runs on over it as an outline.
export default function Story() {
  const wrap = useRef(null)
  const stage = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let raf
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = wrap.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const total = el.offsetHeight - window.innerHeight
        const p = Math.min(1, Math.max(0, -r.top / total))
        const idx = Math.min(CHAPTERS.length - 1, Math.floor(p * CHAPTERS.length))
        setActive(idx)
        // Continuous progress inside the chapter, for the slow zoom and drift.
        const local = p * CHAPTERS.length - idx
        stage.current?.style.setProperty('--local', local.toFixed(3))
        stage.current?.style.setProperty('--p', p.toFixed(3))
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  const go = (i) => {
    const el = wrap.current
    const total = el.offsetHeight - window.innerHeight
    smoothTo(el.offsetTop + (total * (i + 0.5)) / CHAPTERS.length)
  }

  const isDark = useIsDark()
  const c = CHAPTERS[active]
  // Night chapters only in dark mode; in light mode they turn a soft blue, so the page stays light.
  const dark = c.dark && isDark
  const fit = (w) => `min(${w.length > 6 ? 18 : 25}vw, ${w.length > 6 ? 15 : 21}rem)`

  return (
    <section ref={wrap} aria-label="Your child's journey, in four steps" style={{ height: `${CHAPTERS.length * 100 + 40}vh` }} className="relative">
      <div
        ref={stage}
        className={`sticky top-0 flex h-screen flex-col overflow-hidden transition-colors duration-[900ms] ease-premium ${dark ? 'bg-royal-night text-white' : c.dark ? 'bg-royal-soft text-royal-ink' : 'bg-gold-cream text-royal-ink'}`}
      >
        <div className={`grain absolute inset-0 transition-opacity duration-700 ${dark ? 'opacity-100' : 'opacity-60'}`} />
        <div className={`absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700 ${dark ? 'bg-gold/15' : 'bg-gold/25'}`} />
        <GoldFlakes count={22} seed={3} className="z-[3]" />

        {/* Top rail: chapter label and counter */}
        <div className="wrap relative z-[4] flex items-center justify-between pt-28 text-[10px] sm:pt-36 sm:text-[11px] font-semibold uppercase tracking-[0.28em] sm:pt-28">
          <span className={dark ? 'text-gold-bright' : 'text-gold-deep'}>
            Chapter {String(active + 1).padStart(2, '0')} <span className="opacity-50">—</span> The {c.tag}
          </span>
          <span className="tabular-nums opacity-60">{String(active + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}</span>
        </div>

        {/* Stage: solid word behind, photo, outline word in front */}
        <div className="relative z-[2] flex flex-1 items-center justify-center">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[0.82em] -translate-y-1/2 font-serif font-bold" style={{ fontSize: fit(c.word) }}>
            {CHAPTERS.map((ch, i) => (
              <div key={ch.word} className={`absolute inset-0 ${dark ? 'text-paper/95' : 'text-royal-text'}`}>
                <BigWord text={ch.word} on={i === active} />
              </div>
            ))}
          </div>

          <div
            className="relative z-[2] h-[30vh] w-[42vw] sm:h-[54vh] sm:w-[min(36vw,22rem)]"
            style={{ transform: 'translateY(calc((0.5 - var(--local, 0.5)) * 24px)) scale(calc(0.97 + var(--local, 0) * 0.05))' }}
          >
            {CHAPTERS.map((ch, i) => (
              <div
                key={ch.word}
                className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-[2.5rem] border-4 border-gold/70 shadow-pop transition-[clip-path,opacity] duration-[1100ms] ease-premium"
                style={{ clipPath: i === active ? 'inset(0 0 0 0 round 999px 999px 40px 40px)' : i < active ? 'inset(0 0 100% 0 round 999px 999px 40px 40px)' : 'inset(100% 0 0 0 round 999px 999px 40px 40px)' }}
              >
                <img src={photos[ch.photo]} alt="" className="h-full w-full object-cover transition-transform duration-[1600ms] ease-premium" style={{ transform: i === active ? 'scale(1)' : 'scale(1.18)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-night/50 to-transparent" />
              </div>
            ))}
            <div className="absolute -bottom-7 left-1/2 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full bg-paper shadow-glow ring-4 ring-gold/40">
              <Crest className="w-11" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[3] h-[0.82em] -translate-y-1/2 font-serif font-bold" style={{ fontSize: fit(c.word) }}>
            {CHAPTERS.map((ch, i) => (
              <div key={ch.word} className="absolute inset-0" style={{ '--stroke': dark ? 'rgb(232 197 125 / 0.95)' : 'rgb(var(--royal-text) / 0.85)' }}>
                <BigWord text={ch.word} on={i === active} outline />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom rail: the step text and actions */}
        <div className="wrap relative z-[4] grid items-end gap-4 pb-8 sm:gap-6 sm:pb-12 md:grid-cols-[1fr_auto]">
          <div className="relative min-h-[210px] max-w-xl sm:min-h-[150px]">
            {CHAPTERS.map((ch, i) => (
              <div
                key={ch.word}
                className={`absolute inset-x-0 bottom-0 transition-all duration-700 ease-premium ${i === active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
                style={{ transitionDelay: i === active ? '250ms' : '0ms' }}
                aria-hidden={i !== active}
              >
                <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${dark ? 'text-gold-bright' : 'text-gold-deep'}`}>Step {i + 1}</p>
                <h3 className="mt-1 font-serif text-[1.7rem] font-semibold leading-tight sm:text-4xl">{ch.title}</h3>
                <p className={`mt-2 text-[14px] leading-relaxed sm:text-[15px] ${dark ? 'text-white/75' : 'text-ink-soft'}`}>{ch.text}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {active < CHAPTERS.length - 1 ? (
              <button type="button" onClick={() => go(active + 1)} className={dark ? 'btn-outline-light btn-sm' : 'btn-outline btn-sm'}>
                Next chapter <ArrowDown size={15} />
              </button>
            ) : (
              <Link to="/admissions#apply" className="btn-gold btn-sm">Begin the journey <ArrowRight size={15} /></Link>
            )}
          </div>
        </div>

        {/* Side pagination */}
        <nav aria-label="Chapters" className="absolute right-4 top-1/2 z-[5] hidden -translate-y-1/2 flex-col gap-3 sm:flex lg:right-8">
          {CHAPTERS.map((ch, i) => (
            <button
              key={ch.word}
              type="button"
              onClick={() => go(i)}
              aria-label={`Chapter ${i + 1}: ${ch.title}`}
              aria-current={i === active ? 'step' : undefined}
              className="group flex items-center justify-end gap-3"
            >
              <span className={`text-[11px] font-semibold uppercase tracking-[0.2em] opacity-0 transition duration-300 group-hover:opacity-70`}>{ch.word}</span>
              <span className={`block rounded-full transition-all duration-500 ease-premium ${i === active ? 'h-8 w-2 bg-gold' : `h-2 w-2 ${dark ? 'bg-white/35' : 'bg-royal/30'} group-hover:bg-gold`}`} />
            </button>
          ))}
        </nav>

        {/* Overall progress */}
        <div className={`absolute inset-x-0 bottom-0 z-[5] h-[2px] ${dark ? 'bg-white/10' : 'bg-royal/10'}`}>
          <div className="h-full origin-left bg-gold" style={{ transform: 'scaleX(var(--p, 0))' }} />
        </div>
      </div>
    </section>
  )
}
