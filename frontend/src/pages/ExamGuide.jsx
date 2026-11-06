import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Info } from 'lucide-react'
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

      {/* Board exam stages: the three points where a BHGA learner writes Cambridge exams. */}
      <section id="stages" className="py-24">
        <div className="wrap">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-royal p-8 text-white sm:p-14 dark:bg-royal-deep">
            <div className="stripes absolute inset-0 [--stripe:0.1]" />
            <div className="relative">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="eyebrow-light"><span className="h-px w-6 bg-current" />Board exam stages</p>
                  <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">When your child writes Cambridge exams</h2>
                  <p className="mt-4 text-lg text-white/80">BHGA teaches Grade R to Grade 10. Along the way there are three points where learners register as Private Candidates and sit external board exams.</p>
                </div>
                <Link to="/academics#igcse" className="btn-gold">See the IGCSE phase <ArrowRight size={16} /></Link>
              </div>
              <ol className="relative mt-12 grid gap-5 md:grid-cols-3">
                <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-9 hidden h-0.5 bg-gradient-to-r from-gold via-gold/50 to-gold md:block" />
                {examGuide.stages.map((st, i) => (
                  <li key={st.exam} className="relative rounded-[1.75rem] bg-surface p-7 text-center text-royal-ink shadow-pop" data-tilt="5">
                    <span className="relative mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-gold font-serif text-2xl font-bold text-[#0F2438] shadow-glow">{st.grade.replace('Grade ', 'Gr ')}</span>
                    <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.16em] text-gold-deep">Stage {i + 1} · {st.grade}</p>
                    <h3 className="mt-1 font-serif text-[1.7rem] font-semibold leading-tight">{st.exam}</h3>
                    <p className="mt-2 text-[14px] text-ink-soft">{st.after}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 flex items-start gap-2 text-[14px] text-white/75"><BadgeCheck size={18} className="mt-0.5 shrink-0 text-gold" /> Exams are written in the May/June or October/November series, and Cambridge International sends the certificates to the exam centre for collection.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
