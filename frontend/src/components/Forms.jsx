import { useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { submit, errorText } from '../services/api'
import { curricula, gradeOptions, pathways, startOptions } from '../content/site'
import { Field, Honeypot } from './ui'

function useForm(initial) {
  const [values, setValues] = useState(initial)
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e?.target ? e.target.value : e }))
  return [values, set, setValues]
}

function Done({ title, text, onAgain }) {
  return (
    <div className="flex flex-col items-center py-10 text-center" role="status">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-soft text-gold-deep"><CheckCircle2 size={34} /></span>
      <h3 className="mt-5 font-serif text-3xl font-semibold text-royal-ink">{title}</h3>
      <p className="mt-2 max-w-md text-ink-soft">{text}</p>
      <button type="button" onClick={onAgain} className="btn-outline btn-sm mt-6">Send another</button>
    </div>
  )
}

function SubmitButton({ busy, children }) {
  return (
    <button type="submit" disabled={busy} className="btn-gold w-full sm:w-auto">
      {busy ? <Loader2 size={17} className="animate-spin" /> : <Send size={16} />}
      {children}
    </button>
  )
}


const pad = (n) => String(n).padStart(2, '0')
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Day / Month / Year dropdowns: quicker than scrolling a calendar back ten years, and the same on every phone.
function DateOfBirth({ value, onChange }) {
  const [y0, m0, d0] = value ? value.split('-') : ['', '', '']
  const [parts, setParts] = useState({ d: d0 ? String(Number(d0)) : '', m: m0 ? String(Number(m0)) : '', y: y0 })
  const thisYear = new Date().getFullYear()
  const years = Array.from({ length: thisYear - 1995 - 2 }, (_, i) => String(thisYear - 3 - i))
  const daysIn = parts.y && parts.m ? new Date(Number(parts.y), Number(parts.m), 0).getDate() : 31
  const update = (k) => (e) => {
    const next = { ...parts, [k]: e.target.value }
    const max = next.y && next.m ? new Date(Number(next.y), Number(next.m), 0).getDate() : 31
    if (Number(next.d) > max) next.d = ''
    setParts(next)
    onChange(next.d && next.m && next.y ? `${next.y}-${pad(next.m)}-${pad(next.d)}` : '')
  }
  return (
    <div className="grid grid-cols-[1fr_1.6fr_1.2fr] gap-2" role="group" aria-label="Student date of birth">
      <select className="input !px-3" required aria-label="Day" value={parts.d} onChange={update('d')}>
        <option value="" disabled>Day</option>
        {Array.from({ length: daysIn }, (_, i) => <option key={i + 1} value={String(i + 1)}>{i + 1}</option>)}
      </select>
      <select className="input !px-3" required aria-label="Month" value={parts.m} onChange={update('m')}>
        <option value="" disabled>Month</option>
        {MONTHS.map((m, i) => <option key={m} value={String(i + 1)}>{m}</option>)}
      </select>
      <select className="input !px-3" required aria-label="Year" value={parts.y} onChange={update('y')}>
        <option value="" disabled>Year</option>
        {years.map((y) => <option key={y}>{y}</option>)}
      </select>
    </div>
  )
}

// The next ten weekdays as tappable chips, so nobody can pick a weekend.
function WeekdayPicker({ value, onChange }) {
  const days = []
  for (let d = new Date(Date.now() + 86400000); days.length < 10; d = new Date(d.getTime() + 86400000)) {
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d))
  }
  return (
    <div role="radiogroup" aria-labelledby="day-label" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
      {days.map((d) => {
        const id = ymd(d)
        const on = value === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={d.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}
            onClick={() => onChange(id)}
            className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border-2 py-2.5 transition duration-300 ease-premium ${on ? 'border-gold bg-gold text-[#0F2438] shadow-glow' : 'border-line bg-surface text-royal-ink hover:-translate-y-0.5 hover:border-gold/60'}`}
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">{d.toLocaleDateString('en-ZA', { weekday: 'short' })}</span>
            <span className="font-serif text-2xl font-bold leading-none">{d.getDate()}</span>
            <span className="text-[11px] opacity-70">{d.toLocaleDateString('en-ZA', { month: 'short' })}</span>
          </button>
        )
      })}
    </div>
  )
}

const ENQUIRY = { parentName: '', email: '', phone: '', grade: '', curriculum: 'Cambridge', website: '' }

export function EnquiryForm() {
  const [v, set, setV] = useForm(ENQUIRY)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await submit.enquiry(v)
      setDone(true)
    } catch (err) {
      toast.error(errorText(err))
    } finally {
      setBusy(false)
    }
  }

  if (done) return <Done title="Thank you!" text="Our admissions coordinator will get in touch with you shortly." onAgain={() => { setV(ENQUIRY); setDone(false) }} />

  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot value={v.website} onChange={set('website')} />
      <Field label="Parent / Guardian Full Name" required className="sm:col-span-2">
        <input className="input" required maxLength={120} autoComplete="name" value={v.parentName} onChange={set('parentName')} />
      </Field>
      <Field label="Email Address" required>
        <input className="input" type="email" required maxLength={160} autoComplete="email" value={v.email} onChange={set('email')} />
      </Field>
      <Field label="WhatsApp / Phone Number" required>
        <input className="input" type="tel" required maxLength={30} autoComplete="tel" placeholder="+27" value={v.phone} onChange={set('phone')} />
      </Field>
      <Field label="Learner's Target Grade" required>
        <select className="input" required value={v.grade} onChange={set('grade')}>
          <option value="" disabled>Grade R – Grade 12</option>
          {gradeOptions.map((g) => <option key={g}>{g}</option>)}
        </select>
      </Field>
      <Field label="Current Curriculum" required>
        <select className="input" required value={v.curriculum} onChange={set('curriculum')}>
          {curricula.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <SubmitButton busy={busy}>Submit Admission Enquiry</SubmitButton>
      </div>
    </form>
  )
}

const APPLICATION = {
  parentName: '', email: '', phone: '', address: '', studentName: '', studentDob: '',
  pathway: '', previousSchooling: '', startDate: 'Immediate', comments: '', website: '',
}

export function ApplicationForm() {
  const [v, set, setV] = useForm(APPLICATION)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!v.studentDob) { toast.error("Please choose the learner's full date of birth."); return }
    if (!v.pathway) { toast.error('Please select the target grade for enrollment.'); return }
    setBusy(true)
    try {
      await submit.application(v)
      setDone(true)
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      toast.error(errorText(err))
    } finally {
      setBusy(false)
    }
  }

  if (done) return <Done title="Application received" text="Thank you for choosing Bethel House of God Academy. We've emailed you a copy, and our admissions coordinator will contact you about the next steps and the R1,000 registration fee." onAgain={() => { setV(APPLICATION); setDone(false) }} />

  return (
    <form onSubmit={onSubmit} className="relative space-y-8">
      <Honeypot value={v.website} onChange={set('website')} />
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-4 flex items-center gap-3 font-serif text-2xl font-semibold text-royal-ink"><Step n={1} /> Parent / Guardian</legend>
        <Field label="Parent / Guardian Full Name" required className="sm:col-span-2">
          <input className="input" required maxLength={120} autoComplete="name" value={v.parentName} onChange={set('parentName')} />
        </Field>
        <Field label="Parent Email Address" required>
          <input className="input" type="email" required maxLength={160} autoComplete="email" value={v.email} onChange={set('email')} />
        </Field>
        <Field label="Parent Phone / WhatsApp Number" required>
          <input className="input" type="tel" required maxLength={30} autoComplete="tel" placeholder="+27" value={v.phone} onChange={set('phone')} />
        </Field>
        <Field label="Physical Address / Location" required className="sm:col-span-2">
          <input className="input" required maxLength={250} autoComplete="street-address" placeholder="Street, suburb, city" value={v.address} onChange={set('address')} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-4 flex items-center gap-3 font-serif text-2xl font-semibold text-royal-ink"><Step n={2} /> Learner</legend>
        <Field label="Student Name & Surname" required>
          <input className="input" required maxLength={120} value={v.studentName} onChange={set('studentName')} />
        </Field>
        <div>
          <span className="label">Student Date of Birth<span className="text-gold-deep"> *</span></span>
          <DateOfBirth value={v.studentDob} onChange={set('studentDob')} />
        </div>
        <Field label="Current Curriculum / Previous Schooling" required className="sm:col-span-2">
          <input className="input" required maxLength={200} placeholder="e.g. Cambridge Grade 6 at a home-school centre" value={v.previousSchooling} onChange={set('previousSchooling')} />
        </Field>
      </fieldset>

      <fieldset>
        <legend className="mb-4 flex items-center gap-3 font-serif text-2xl font-semibold text-royal-ink"><Step n={3} /> Select Target Grade for Enrollment</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {pathways.map((p) => {
            const on = v.pathway === p.id
            return (
              <label key={p.id} className={`relative flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${on ? 'border-gold bg-gold-cream' : 'border-line bg-surface hover:border-royal/30'}`}>
                <input type="radio" name="pathway" value={p.id} checked={on} onChange={set('pathway')} className="mt-1 h-4 w-4 accent-[#2B5B84]" />
                <span>
                  <span className="block font-semibold text-royal-ink">{p.short}</span>
                  <span className="block text-[13px] text-ink-soft">{p.phase} · <strong className="text-gold-deep">{p.fee}/pm</strong></span>
                </span>
              </label>
            )
          })}
        </div>
        {/* Not a <label>: a label would pass every click on to its first button. */}
        <div className="mt-5" role="radiogroup" aria-labelledby="start-label">
          <span id="start-label" className="label">Intended Start Date<span className="text-gold-deep"> *</span></span>
          <div className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-surface p-1 sm:max-w-md">
            {startOptions.map((s) => (
              <button type="button" role="radio" aria-checked={v.startDate === s} key={s} onClick={() => set('startDate')(s)} className={`rounded-lg px-2 py-2.5 text-[13px] font-semibold leading-tight transition ${v.startDate === s ? 'bg-royal text-white' : 'text-ink-soft hover:bg-royal-soft'}`}>{s}</button>
            ))}
          </div>
        </div>
      </fieldset>

      <Field label="Additional Comments / Questions">
        <textarea className="input min-h-[120px]" maxLength={2000} value={v.comments} onChange={set('comments')} />
      </Field>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-muted">A once-off R1,000 registration fee applies per learner.</p>
        <SubmitButton busy={busy}>Complete Enrollment Application</SubmitButton>
      </div>
    </form>
  )
}

function Step({ n }) {
  return <span className="grid h-8 w-8 place-items-center rounded-full bg-royal font-sans text-sm font-bold text-white">{n}</span>
}

const CONSULT = { name: '', email: '', phone: '', preferredDate: '', preferredTime: 'Morning (08:00 – 12:00)', topic: '', website: '' }

export function ConsultationForm() {
  const [v, set, setV] = useForm(CONSULT)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!v.preferredDate) { toast.error('Please choose a day for your consultation.'); return }
    setBusy(true)
    try {
      await submit.consultation(v)
      setDone(true)
    } catch (err) {
      toast.error(errorText(err))
    } finally {
      setBusy(false)
    }
  }

  if (done) return <Done title="Consultation requested" text="We'll email you a Zoom link and confirm the time within one working day." onAgain={() => { setV(CONSULT); setDone(false) }} />

  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot value={v.website} onChange={set('website')} />
      <Field label="Your Name" required className="sm:col-span-2">
        <input className="input" required maxLength={120} autoComplete="name" value={v.name} onChange={set('name')} />
      </Field>
      <Field label="Email Address" required>
        <input className="input" type="email" required maxLength={160} autoComplete="email" value={v.email} onChange={set('email')} />
      </Field>
      <Field label="Phone / WhatsApp" required>
        <input className="input" type="tel" required maxLength={30} autoComplete="tel" placeholder="+27" value={v.phone} onChange={set('phone')} />
      </Field>
      <div className="sm:col-span-2">
        <span id="day-label" className="label">Preferred Day<span className="text-gold-deep"> *</span> <span className="font-normal text-ink-muted">· Monday – Friday</span></span>
        <WeekdayPicker value={v.preferredDate} onChange={set('preferredDate')} />
      </div>
      <Field label="Preferred Time (SAST)" required className="sm:col-span-2">
        <select className="input" value={v.preferredTime} onChange={set('preferredTime')}>
          <option>Morning (08:00 – 12:00)</option>
          <option>Afternoon (12:00 – 16:00)</option>
        </select>
      </Field>
      <Field label="What would you like to discuss?" className="sm:col-span-2">
        <textarea className="input min-h-[96px]" maxLength={1000} placeholder="e.g. Grade 10 subject choices for the USAf exemption" value={v.topic} onChange={set('topic')} />
      </Field>
      <div className="sm:col-span-2">
        <SubmitButton busy={busy}>Book My 15-Minute Zoom Call</SubmitButton>
      </div>
    </form>
  )
}
