import { CalendarDays, CheckCircle2, PlayCircle } from 'lucide-react'
import { edubridge, photos } from '../content/site'
import { CtaBand, Icon, PageHero, Reveal, SectionHead } from '../components/ui'

// A drawn picture of the learner dashboard, so parents can see what they get before signing up.
function DashboardMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[3rem] bg-gold-soft/70 blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-pop">
        <div className="flex items-center gap-2 border-b border-line bg-canvas px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#F87171]" /><span className="h-3 w-3 rounded-full bg-gold" /><span className="h-3 w-3 rounded-full bg-[#4ADE80]" />
          <span className="ml-3 rounded-md bg-surface px-3 py-1 text-[11px] text-ink-muted">edubridge · learner dashboard</span>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-[1.3fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl bg-royal">
            <img src={photos.girlLaptop} alt="" className="h-48 w-full object-cover opacity-80" />
            <div className="absolute inset-0 grid place-items-center"><PlayCircle size={52} className="text-white drop-shadow-lg" /></div>
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#EF4444] px-2.5 py-1 text-[11px] font-bold text-white"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-surface" />LIVE · Mathematics</span>
          </div>
          <div className="space-y-3">
            {[['Attendance', '96%', 'bg-royal'], ['Assessments', '82%', 'bg-gold'], ['Submissions', '14/15', 'bg-royal-deep']].map(([l, v, c]) => (
              <div key={l} className="rounded-2xl border border-line p-3">
                <div className="flex items-center justify-between text-[12px]"><span className="text-ink-muted">{l}</span><span className="font-bold text-royal-ink">{v}</span></div>
                <div className="mt-2 h-1.5 rounded-full bg-line"><div className={`h-full rounded-full ${c}`} style={{ width: l === 'Submissions' ? '93%' : v }} /></div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-canvas p-4 sm:col-span-2">
            <p className="flex items-center gap-2 text-[12px] font-semibold text-ink-muted"><CalendarDays size={14} /> Due this week</p>
            <ul className="mt-2 space-y-1.5 text-[13px]">
              {['English essay: Narrative writing', 'Physics past paper 2 (drill)', 'Geography map work'].map((t, i) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 size={15} className={i === 0 ? 'text-gold-deep' : 'text-line'} /> <span className="text-ink-soft">{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Edubridge() {
  return (
    <>
      <PageHero eyebrow="Our learning platform" title={edubridge.title} subtitle={edubridge.subtitle} crumb="Edubridge E-Learning" photo={photos.girlLaptop} />

      <section className="overflow-hidden py-24">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Platform features" title="Everything your child needs, in one place">
              Live lessons, recordings, study packs and past papers, with a dashboard that keeps parents in the picture.
            </SectionHead>
          </div>
          <Reveal delay={100}><DashboardMock /></Reveal>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {edubridge.features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 70}
              data-tilt="4" className={`spotlight group relative rounded-[2rem] p-8 transition duration-500 ease-premium hover:-translate-y-1 hover:shadow-pop ${i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'} ${i === 0 ? 'bg-royal text-white' : i === 1 ? 'bg-gold-cream' : 'border border-line bg-canvas'}`}
            >
              <span className={`grid h-14 w-14 place-items-center rounded-2xl ${i === 0 ? 'bg-gold text-royal-night' : 'bg-royal text-gold'}`}><Icon name={f.icon} size={26} /></span>
              <h3 className={`mt-6 font-serif text-[1.75rem] font-semibold leading-tight ${i === 0 ? 'text-white' : 'text-royal-ink'}`}>{f.title}</h3>
              <p className={`mt-2 leading-relaxed ${i === 0 ? 'text-white/80' : 'text-ink-soft'}`}>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
