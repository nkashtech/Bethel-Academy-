import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, BadgeCheck, Receipt } from 'lucide-react'
import { fees, pathways, photos, school } from '../content/site'
import { CheckList, CtaBand, PageHero, Reveal, SectionHead } from '../components/ui'

export default function Fees() {
  return (
    <>
      <PageHero eyebrow="Tuition & Fees" title={fees.title} subtitle={fees.subtitle} crumb="Tuition & Fees" photo={photos.girlsTablet} />

      <section className="py-24">
        <div className="wrap">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <SectionHead eyebrow="Monthly tuition" title="Monthly Tuition Fee Schedule" />
            {/* Registration fee */}
            <Reveal className="flex items-center gap-5 rounded-[2rem] border-2 border-dashed border-gold bg-gold-cream px-6 py-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold text-royal-night"><Receipt size={26} /></span>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold-deep">Registration Fee</p>
                <p className="font-serif text-4xl font-bold text-royal-ink">{school.registrationFee}</p>
                <p className="max-w-[16rem] text-[13px] text-ink-soft">{fees.registration}</p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pathways.map((p, i) => {
              const top = i === 3
              return (
                <Reveal key={p.id} delay={i * 80} data-tilt="5" className={`spotlight relative flex h-full flex-col rounded-[2rem] p-7 transition duration-500 ease-premium hover:-translate-y-1 ${top ? 'bg-royal text-white shadow-pop' : 'border border-line bg-surface shadow-soft'}`}>
                  {top && <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-royal-night">Up to 8 subjects</span>}
                  <p className={`text-[12px] font-bold uppercase tracking-[0.16em] ${top ? 'text-gold-bright' : 'text-gold-deep'}`}>{p.id === 'igcse' ? 'IGCSE (Grades 10–12)' : `Grade (${p.short.replace('Grade ', '')})`}</p>
                  <h3 className={`mt-2 font-serif text-2xl font-semibold ${top ? 'text-white' : 'text-royal-ink'}`}>{p.feePhase || p.phase}</h3>
                  <p className="mb-8 mt-6 flex items-baseline gap-1">
                    <span className={`font-serif text-5xl font-bold ${top ? 'text-white' : 'text-royal-text'}`}>{p.fee}</span>
                    <span className={top ? 'text-white/60' : 'text-ink-muted'}>/ month</span>
                  </p>
                  <Link to="/admissions#apply" className={`mt-auto ${top ? 'btn-gold' : 'btn-outline'}`}>Enroll Now</Link>
                </Reveal>
              )
            })}
          </div>

          {/* The same schedule as a table, as in the brief, for easy comparison and printing. */}
          <Reveal className="mt-10 overflow-x-auto rounded-[1.5rem] border border-line bg-surface">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Monthly tuition fee schedule</caption>
              <thead className="bg-royal-night text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider">Grade / Programme</th>
                  <th scope="col" className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider">Covered Phases</th>
                  <th scope="col" className="px-6 py-4 text-right text-[12px] font-semibold uppercase tracking-wider">Monthly Tuition Fee</th>
                </tr>
              </thead>
              <tbody>
                {pathways.map((p) => (
                  <tr key={p.id} className="border-t border-line odd:bg-canvas">
                    <td className="px-6 py-4 font-semibold text-royal-ink">{p.id === 'igcse' ? 'IGCSE (Grades 10–12)' : `GRADE (${p.short.replace('Grade ', '')})`}</td>
                    <td className="px-6 py-4 text-ink-soft">{p.feePhase || p.phase}</td>
                    <td className="px-6 py-4 text-right font-serif text-xl font-bold text-royal-text">{p.fee} / month</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="wrap grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-canvas p-8 sm:p-10">
            <BadgeCheck size={32} className="text-gold-deep" />
            <h2 className="mt-4 font-serif text-4xl font-semibold text-royal-ink">What Our Tuition Includes</h2>
            <CheckList className="mt-6" items={fees.includes} />
            <Link to="/edubridge" className="mt-8 inline-flex items-center gap-2 font-semibold text-royal-text hover:text-gold-deep">Tour the Edubridge platform <ArrowRight size={16} /></Link>
          </Reveal>
          <Reveal delay={100} className="relative overflow-hidden rounded-[2rem] bg-royal-night p-8 text-white sm:p-10">
            <div className="stripes absolute inset-0 [--stripe:0.1]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-royal-night"><AlertTriangle size={14} /> Important</span>
              <h2 className="mt-5 font-serif text-4xl font-semibold">Exam Fee Disclaimer</h2>
              <p className="mt-2 font-semibold text-gold-bright">Exam Fee Note:</p>
              <p className="mt-2 text-lg leading-relaxed text-white/80">{fees.examNote}</p>
              <Link to="/exam-guide" className="btn-outline-light mt-8">Read the exam guide <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
