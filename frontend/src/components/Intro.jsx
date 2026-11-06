import { useEffect, useState } from 'react'
import { Crest } from './ui'

// A short opening: a gold ring draws round the crest, the motto appears, then the curtain parts.
// Shown once per visit, skipped for reduced motion, and any click or key skips it.
export default function Intro() {
  const [stage, setStage] = useState(() => {
    try {
      if (sessionStorage.getItem('introSeen') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done'
    } catch { return 'done' }
    return 'play'
  })

  useEffect(() => {
    if (stage === 'done') return
    try { sessionStorage.setItem('introSeen', '1') } catch { /* private mode */ }
    window.__lenis?.stop()
    document.documentElement.classList.add('intro-on')
    const open = setTimeout(() => setStage('open'), 2300)
    const done = setTimeout(() => setStage('done'), 3400)
    const skip = () => { setStage('open'); setTimeout(() => setStage('done'), 1000) }
    window.addEventListener('keydown', skip, { once: true })
    return () => { clearTimeout(open); clearTimeout(done); window.removeEventListener('keydown', skip) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stage !== 'done') return
    window.__lenis?.start()
    document.documentElement.classList.remove('intro-on')
  }, [stage])

  if (stage === 'done') return null
  const open = stage === 'open'
  const motto = 'Real Christian Values, Real life Education'

  return (
    <div
      className="fixed inset-0 z-[200] cursor-pointer"
      onClick={() => { setStage('open'); setTimeout(() => setStage('done'), 1000) }}
      role="presentation"
    >
      {/* Two curtains that part */}
      <div className={`absolute inset-x-0 top-0 h-1/2 bg-[#06101B] transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? '-translate-y-full' : ''}`}>
        <div className="stripes absolute inset-0 [--stripe:0.05]" />
      </div>
      <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#06101B] transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? 'translate-y-full' : ''}`}>
        <div className="stripes absolute inset-0 [--stripe:0.05]" />
      </div>
      <div className={`absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-opacity duration-300 ${open ? 'opacity-0' : 'animate-intro-line'}`} />

      <div className={`absolute inset-0 grid place-items-center transition-all duration-700 ease-premium ${open ? 'scale-110 opacity-0' : ''}`}>
        <div className="flex flex-col items-center text-center">
          <div className="relative grid h-44 w-44 place-items-center sm:h-52 sm:w-52">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="100" cy="100" r="96" fill="none" stroke="rgb(212 168 83 / 0.15)" strokeWidth="1" />
              <circle cx="100" cy="100" r="96" fill="none" stroke="url(#introGold)" strokeWidth="2" strokeLinecap="round" strokeDasharray="604" className="animate-intro-ring" />
              <defs>
                <linearGradient id="introGold" x1="0" x2="1"><stop offset="0" stopColor="#9C7228" /><stop offset=".5" stopColor="#F3D58C" /><stop offset="1" stopColor="#D4A853" /></linearGradient>
              </defs>
            </svg>
            <div className="intro-crest relative grid h-36 w-36 place-items-center overflow-hidden rounded-full bg-paper shadow-glow sm:h-44 sm:w-44">
              <Crest className="w-24 sm:w-28" />
            </div>
          </div>
          <p className="mt-8 font-serif text-2xl font-semibold tracking-wide text-white sm:text-3xl">
            {'Bethel House of God Academy'.split(' ').map((w, i) => (
              <span key={i} className="inline-block animate-word-in" style={{ animationDelay: `${700 + i * 90}ms` }}>{w}&nbsp;</span>
            ))}
          </p>
          <p className="mt-2 font-serif text-lg italic text-gold-bright">
            {motto.split('').map((ch, i) => (
              <span key={i} className="inline-block animate-fade-up" style={{ animationDelay: `${1200 + i * 18}ms` }}>{ch === ' ' ? ' ' : ch}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}
