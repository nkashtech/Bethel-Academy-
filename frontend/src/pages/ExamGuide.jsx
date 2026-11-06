import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Building2, Info } from 'lucide-react'
import { examGuide, photos } from '../content/site'
import { CtaBand, Icon, PageHero, Reveal, SectionHead } from '../components/ui'

export default function ExamGuide() {
  return (
    <>
      <PageHero eyebrow="Private Candidate & Exam Guide" title={examGuide.title} subtitle={examGuide.subtitle} crumb="Private Candidate & Exam Guide" photo={photos.graduateKid} />

      {/* Independent tuition platform */}
      <section className="py-24">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <SectionHead eyebrow="Our model" title="What Is an Independent Tuition Platform?" />
          <Reveal delay={80} className="space-y-5 text-[17px] leading-relaxed text-ink-soft">
            {examGuide.platform.map((t) => <p key={t}>{t}</p>)}
            <div className="flex gap-3 rounded-2xl border border-gold/40 bg-gold-cream p-5 text-[15px]">
              <Info size={20} className="mt-0.5 shrink-0 text-gold-deep" />
              <p>You pay us for teaching. You pay the exam centre for board exams, only when your child is ready to write.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How board exams work */}
      <section className="bg-surface py-24">
        <div className="wrap">
          <SectionHead center eyebrow="Step by step" title="How Board Examinations Work" />
          <ol className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute bottom-6 left-7 top-6 w-0.5 bg-gradient-to-b from-gold via-royal/30 to-gold sm:left-1/2" />
            {examGuide.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className={`relative mb-10 flex gap-6 last:mb-0 sm:w-1/2 ${i % 2 ? 'sm:ml-auto sm:pl-12' : 'sm:flex-row-reverse sm:pr-12 sm:text-right'}`}>
                <span className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-surface shadow-pop sm:absolute sm:top-2 ${i % 2 ? 'bg-royal text-gold sm:-left-7' : 'bg-gold text-royal-night sm:-right-7'}`}>
                  <Icon name={s.icon} size={22} />
                </span>
                <div className="spotlight rounded-3xl border border-line bg-canvas p-6 transition duration-500 ease-premium hover:-translate-y-1 hover:shadow-pop">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold-deep">Step {i + 1}</p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-royal-ink">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* USAf */}
      <section id="usaf" className="py-24">
        <div className="wrap">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-royal p-8 text-white sm:p-14">
            <div className="stripes absolute inset-0 [--stripe:0.1]" />
            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="eyebrow-light"><span className="h-px w-6 bg-current" />University entrance</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">South African University Entry (USAf Exemption)</h2>
                <p className="mt-5 text-lg text-white/80">{examGuide.recognition}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {examGuide.universities.map((u) => (
                    <span key={u} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[14px] font-semibold"><Building2 size={15} className="text-gold" />{u}</span>
                  ))}
                </div>
                <p className="mt-8 text-white/80">{examGuide.exemptionAfter}</p>
              </div>
              <div className="rounded-[2rem] bg-surface p-8 text-royal-ink shadow-pop">
                <BadgeCheck size={34} className="text-gold-deep" />
                <p className="mt-4 text-ink-soft">{examGuide.exemptionLead}</p>
                <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                  <div className="rounded-2xl bg-royal-soft p-4">
                    <p className="font-serif text-5xl font-bold text-royal-text">4</p>
                    <p className="text-[13px] font-semibold">AS Levels</p>
                    <p className="text-[12px] text-ink-muted">Grades A – D</p>
                  </div>
                  <span className="font-serif text-4xl text-gold-deep">+</span>
                  <div className="rounded-2xl bg-gold-soft p-4">
                    <p className="font-serif text-5xl font-bold text-gold-deep">1</p>
                    <p className="text-[13px] font-semibold">IGCSE</p>
                    <p className="text-[12px] text-ink-muted">Grades A* – C</p>
                  </div>
                </div>
                <p className="mt-6 text-center font-serif text-xl italic">= Foreign Matriculation Exemption</p>
                <Link to="/academics#igcse" className="btn-royal mt-6 w-full">See IGCSE subjects <ArrowRight size={16} /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
