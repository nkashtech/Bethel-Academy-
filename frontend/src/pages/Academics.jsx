import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Landmark } from 'lucide-react'
import { pathways, photos } from '../content/site'
import { CtaBand, PageHero, Reveal } from '../components/ui'

const streamIcons = { Sciences: 'bg-royal text-white', Commercials: 'bg-gold text-royal-night', 'Humanities & IT': 'bg-royal-night text-white' }

export default function Academics() {
  const igcse = pathways[3]
  return (
    <>
      <PageHero eyebrow="Academics & Curriculum" title="Academic Programs & Subject Streams" subtitle="Cambridge-Aligned Instruction from Early Learning to Senior High School" crumb="Academics & Programs" photo={photos.girlStudy}>
        <div className="mt-8 flex flex-wrap gap-2">
          {pathways.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="rounded-full border border-white/25 px-4 py-2 text-[13px] font-semibold text-white/90 transition hover:border-gold hover:bg-gold hover:text-royal-night">{p.short}</a>
          ))}
        </div>
      </PageHero>

      <div className="py-12 sm:py-20">
        {pathways.slice(0, 3).map((p, i) => (
          <section key={p.id} id={p.id} className="wrap py-10">
            <Reveal from={i % 2 ? 'right' : 'left'} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="relative">
                <Reveal from="clip" className={`overflow-hidden rounded-[2.5rem] ${i % 2 ? 'bg-gold' : 'bg-royal'}`}>
                  <img src={photos[p.photo]} alt="" loading="lazy" className="h-[340px] w-full object-cover sm:h-[420px]" />
                </Reveal>
                <span className="absolute -bottom-5 left-6 rounded-2xl bg-surface px-5 py-3 font-serif text-xl font-bold text-royal-ink shadow-pop">{p.grades}</span>
              </div>
              <div>
                <p className="eyebrow"><span className="h-px w-6 bg-current" />{p.stage || 'Pathway'} · {p.fee}/month</p>
                <h2 className="h-section mt-3">{p.phase}</h2>
                <p className="mt-1 font-serif text-2xl italic text-gold-deep">{p.grades}</p>
                <p className="lead mt-5">{p.intro}</p>
                {p.lists.map((l) => (
                  <div key={l.label} className="mt-7">
                    <h3 className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{l.label}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {l.items.map((s) => <span key={s} className="rounded-full border border-royal/15 bg-royal-soft px-4 py-2 text-[14px] font-medium text-royal-ink">{s}</span>)}
                    </div>
                  </div>
                ))}
                <div className="mt-7 rounded-2xl border-l-4 border-gold bg-gold-cream p-5">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-deep">{p.format.label}</p>
                  <p className="mt-1 text-ink-soft">{p.format.text}</p>
                </div>
              </div>
            </Reveal>
          </section>
        ))}
      </div>

      {/* IGCSE */}
      <section id={igcse.id} className="relative overflow-hidden bg-royal-night py-24 text-white">
        <div className="stripes absolute right-0 top-0 h-full w-1/2 [--stripe:0.1] [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="wrap relative">
          <Reveal className="max-w-3xl">
            <p className="eyebrow-light"><span className="h-px w-6 bg-current" />Grades 10 – 12 · {igcse.fee}/month</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] sm:text-6xl">Cambridge IGCSE &amp; Senior High School</h2>
            <p className="mt-5 text-lg text-white/75">{igcse.intro}</p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="rounded-[2rem] bg-gold p-8 text-royal-night">
              <GraduationCap size={34} />
              <h3 className="mt-5 font-serif text-3xl font-semibold">Compulsory Core Subjects</h3>
              <ul className="mt-5 space-y-3">
                {igcse.lists[0].items.map((s) => <li key={s} className="rounded-2xl bg-white/50 px-5 py-4 text-lg font-semibold">{s}</li>)}
              </ul>
            </Reveal>
            <Reveal delay={100} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
              <h3 className="font-serif text-3xl font-semibold">Elective Streams &amp; Available Subjects</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {igcse.streams.map((s) => (
                  <div key={s.name} className="rounded-2xl bg-surface p-5 text-royal-ink">
                    <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold ${streamIcons[s.name]}`}>{s.name}</span>
                    <ul className="mt-4 space-y-2 text-[15px] font-medium">
                      {s.items.map((x) => <li key={x} className="border-b border-line pb-2 last:border-0">{x}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-6 grid items-center gap-6 rounded-[2rem] border border-gold/40 bg-gradient-to-br from-royal to-royal-deep p-8 md:grid-cols-[auto_1fr_auto] sm:p-10">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gold text-royal-night"><Landmark size={30} /></span>
            <div>
              <h3 className="font-serif text-3xl font-semibold">High School University Pathway (USAf Exemption Track)</h3>
              <p className="mt-2 text-white/80">{igcse.usaf}</p>
            </div>
            <Link to="/exam-guide#usaf" className="btn-gold">USAf requirements <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
