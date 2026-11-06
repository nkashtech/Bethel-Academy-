import { useEffect, useState } from 'react'

// 'light' | 'dark' | 'system', remembered in this browser. public/theme.js applies it before first paint.
const read = () => {
  try { return localStorage.getItem('theme') || 'system' } catch { return 'system' }
}
const media = () => window.matchMedia('(prefers-color-scheme: dark)')

function apply(choice) {
  const dark = choice === 'dark' || (choice === 'system' && media().matches)
  const root = document.documentElement
  // Switch colours instantly everywhere, not element by element.
  root.classList.add('[&_*]:!transition-none')
  root.classList.toggle('dark', dark)
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('[&_*]:!transition-none')))
}

export function useTheme() {
  const [theme, setTheme] = useState(read)
  useEffect(() => {
    apply(theme)
    try { localStorage.setItem('theme', theme) } catch { /* private mode */ }
    if (theme !== 'system') return
    const m = media()
    const on = () => apply('system')
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [theme])
  return [theme, setTheme]
}

// True while the page is in dark mode; updates when the visitor switches theme.
export function useIsDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    const root = document.documentElement
    const mo = new MutationObserver(() => setDark(root.classList.contains('dark')))
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])
  return dark
}
