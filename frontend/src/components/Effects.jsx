import { useEffect } from 'react'
import Lenis from 'lenis'

const finePointer = () => window.matchMedia('(pointer: fine)').matches
const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Smooth scrolling, gently eased. Other code scrolls through window.__lenis so the two never fight.
function useSmoothScroll() {
  useEffect(() => {
    if (calm()) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
    window.__lenis = lenis
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    // Scroll speed drives a slight skew on ribbons and big type.
    lenis.on('scroll', ({ velocity }) => {
      const v = Math.max(-1, Math.min(1, velocity / 40))
      document.documentElement.style.setProperty('--velocity', v.toFixed(3))
    })
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis }
  }, [])
}

// Scroll to an element (less the header height) or to a y position, smoothly when Lenis is running.
export function smoothTo(target, offset = -136) {
  // Work out the page position ourselves: it's reliable whatever the layout above has just done.
  const y = Math.max(0, typeof target === 'number' ? target : (target?.getBoundingClientRect().top ?? 0) + window.scrollY + offset)
  if (window.__lenis) {
    // A page that has just loaded may be taller than Lenis last measured; re-measure so it can reach the target.
    window.__lenis.resize()
    window.__lenis.scrollTo(y, { duration: 1.4, force: true })
  }
  else window.scrollTo({ top: y, behavior: 'smooth' })
}

// Buttons that lean toward the cursor, and cards that tilt in 3D with a glare.
function useMagnetAndTilt() {
  useEffect(() => {
    if (!finePointer() || calm()) return
    let magnet = null
    let tilt = null
    const reset = (el, kind) => {
      if (!el) return
      el.style.transform = ''
      if (kind === 'tilt') el.style.removeProperty('--glare')
    }
    const move = (e) => {
      const m = e.target.closest?.('.btn-gold, [data-magnetic]')
      if (m !== magnet) { reset(magnet, 'magnet'); magnet = m }
      if (m) {
        const b = m.getBoundingClientRect()
        const dx = e.clientX - (b.left + b.width / 2)
        const dy = e.clientY - (b.top + b.height / 2)
        m.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`
      }
      const t = e.target.closest?.('[data-tilt]')
      if (t !== tilt) { reset(tilt, 'tilt'); tilt = t }
      if (t) {
        const b = t.getBoundingClientRect()
        const px = (e.clientX - b.left) / b.width - 0.5
        const py = (e.clientY - b.top) / b.height - 0.5
        const max = Number(t.dataset.tilt) || 7
        t.style.transform = `perspective(900px) rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg) translateY(-6px)`
        t.style.setProperty('--glare', '1')
        t.style.setProperty('--gx', `${(px + 0.5) * 100}%`)
        t.style.setProperty('--gy', `${(py + 0.5) * 100}%`)
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
}

export default function Effects() {
  useSmoothScroll()
  useMagnetAndTilt()
  return null
}
