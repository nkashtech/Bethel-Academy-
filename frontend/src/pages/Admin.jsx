import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { LogOut, RefreshCw } from 'lucide-react'
import { admin, errorText } from '../services/api'
import { pathways } from '../content/site'
import { Crest } from '../components/ui'

// Where the admissions team reads what parents sent. The key is ADMIN_API_KEY from backend/.env.
const TABS = [
  { id: 'applications', label: 'Applications' },
  { id: 'enquiries', label: 'Enquiries' },
  { id: 'consultations', label: 'Consultations' },
]
const STATUSES = ['NEW', 'CONTACTED', 'ENROLLED', 'CLOSED']
const phase = (id) => pathways.find((p) => p.id === id)?.short || id
const when = (d) => new Date(d).toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' })

const COLUMNS = {
  applications: [
    ['Received', (r) => when(r.createdAt)],
    ['Learner', (r) => <><b>{r.studentName}</b><br /><span className="text-ink-muted">Born {r.studentDob?.slice(0, 10)}</span></>],
    ['Grade', (r) => phase(r.pathway)],
    ['Parent', (r) => <>{r.parentName}<br /><a className="text-royal-text underline" href={`mailto:${r.email}`}>{r.email}</a><br />{r.phone}</>],
    ['Details', (r) => <>{r.address}<br /><span className="text-ink-muted">From: {r.previousSchooling} · Start: {r.startDate}</span>{r.comments && <><br /><i>“{r.comments}”</i></>}</>],
  ],
  enquiries: [
    ['Received', (r) => when(r.createdAt)],
    ['Parent', (r) => <b>{r.parentName}</b>],
    ['Contact', (r) => <><a className="text-royal-text underline" href={`mailto:${r.email}`}>{r.email}</a><br />{r.phone}</>],
    ['Target grade', (r) => r.grade],
    ['Curriculum', (r) => r.curriculum],
  ],
  consultations: [
    ['Received', (r) => when(r.createdAt)],
    ['Name', (r) => <b>{r.name}</b>],
    ['Contact', (r) => <><a className="text-royal-text underline" href={`mailto:${r.email}`}>{r.email}</a><br />{r.phone}</>],
    ['Preferred', (r) => <>{r.preferredDate?.slice(0, 10)}<br />{r.preferredTime}</>],
    ['Topic', (r) => r.topic || '—'],
  ],
}

export default function Admin() {
  const [key, setKey] = useState(() => sessionStorage.getItem('adminKey') || '')
  const [draft, setDraft] = useState('')
  const [tab, setTab] = useState('applications')
  const [rows, setRows] = useState(null)

  const load = async () => {
    setRows(null)
    try {
      setRows(await admin.submissions(key, tab))
    } catch (err) {
      if (err?.response?.status === 401) { sessionStorage.removeItem('adminKey'); setKey(''); toast.error('That key is not right.') }
      else toast.error(errorText(err))
      setRows([])
    }
  }
  useEffect(() => { if (key) load() }, [key, tab]) // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = async (id, status) => {
    try {
      await admin.setStatus(key, tab, id, status)
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch (err) { toast.error(errorText(err)) }
  }

  if (!key) {
    return (
      <div className="grid min-h-screen place-items-center bg-royal-night p-4">
        <form
          onSubmit={(e) => { e.preventDefault(); sessionStorage.setItem('adminKey', draft); setKey(draft) }}
          className="w-full max-w-sm rounded-3xl bg-surface p-8 text-center shadow-pop"
        >
          <Crest className="mx-auto w-20" />
          <h1 className="mt-4 font-serif text-3xl font-semibold text-royal-ink">Admissions inbox</h1>
          <p className="mt-1 text-[14px] text-ink-muted">Enter the admin key to see submissions.</p>
          <input type="password" className="input mt-6" placeholder="Admin key" value={draft} onChange={(e) => setDraft(e.target.value)} required autoFocus />
          <button className="btn-gold mt-4 w-full">Open inbox</button>
          <Link to="/" className="mt-4 inline-block text-[13px] text-ink-muted hover:text-royal-text">Back to the website</Link>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="bg-royal-night text-white">
        <div className="wrap flex h-16 items-center gap-3">
          <Crest className="h-10" />
          <span className="font-serif text-xl font-semibold">Admissions inbox</span>
          <button onClick={load} className="btn-outline-light btn-sm ml-auto"><RefreshCw size={14} /> Refresh</button>
          <button onClick={() => { sessionStorage.removeItem('adminKey'); setKey('') }} className="btn-outline-light btn-sm"><LogOut size={14} /> Lock</button>
        </div>
      </header>
      <div className="wrap py-8">
        <div className="inline-flex gap-1 rounded-full border border-line bg-surface p-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`rounded-full px-4 py-2 text-[13px] font-semibold ${tab === t.id ? 'bg-royal text-white' : 'text-ink-soft hover:bg-royal-soft'}`}>{t.label}</button>
          ))}
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-[900px] text-left text-[14px]">
            <thead className="bg-royal-soft text-[12px] uppercase tracking-wider text-royal-ink">
              <tr>{COLUMNS[tab].map(([h]) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}<th className="px-4 py-3 font-semibold">Status</th></tr>
            </thead>
            <tbody>
              {rows === null && <tr><td colSpan={6} className="px-4 py-10 text-center text-ink-muted">Loading…</td></tr>}
              {rows?.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-ink-muted">Nothing here yet.</td></tr>}
              {rows?.map((r) => (
                <tr key={r.id} className="border-t border-line align-top">
                  {COLUMNS[tab].map(([h, f]) => <td key={h} className="px-4 py-3">{f(r)}</td>)}
                  <td className="px-4 py-3">
                    <select className="input !w-auto !py-1.5 text-[13px]" value={r.status} onChange={(e) => setStatus(r.id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
