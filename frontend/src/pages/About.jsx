import { Eye, Flame, Target } from 'lucide-react'
import { about, photos } from '../content/site'
import { CtaBand, Icon, PageHero, Reveal, SectionHead } from '../components/ui'

export default function About() {
  return (
    <>
      <PageHero eyebrow="Who we are" title={about.title} subtitle={about.subtitle} crumb="About Us" photo={photos.boysBackpacks} />

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="wrap grid gap-6 lg:grid-cols-2">
          {[
            { icon: Eye, label: 'Our Vision', text: about.vision, cls: 'bg-surface border border-line', ink: 'text-royal-ink', body: 'text-ink-soft', chip: 'bg-royal text-gold' },
            { icon: Target, label: 'Our Mission', text: about.mission, cls: 'bg-royal text-white', ink: 'text-white', body: 'text-white/80', chip: 'bg-gold text-royal-night' },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 100} className={`relative overflow-hidden rounded-[2.25rem] p-8 shadow-soft sm:p-12 ${c.cls}`}>
              {i === 1 && <div className="stripes absolute inset-0 [--stripe:0.12]" />}
              <div className="relative">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl ${c.chip}`}><c.icon size={26} /></span>
                <h2 className={`mt-6 font-serif text-4xl font-semibold ${c.ink}`}>{c.label}</h2>
                <p className={`mt-4 text-lg leading-relaxed ${c.body}`}>{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Statement of faith */}
      <section className="relative overflow-hidden bg-gold-cream py-24">
        <div className="dots absolute inset-0 opacity-50" />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHead eyebrow="Statement of Faith" title="What We Believe" />
            <Reveal delay={80}>
              <blockquote className="mt-8 border-l-4 border-gold pl-6 font-serif text-3xl italic leading-snug text-royal-text sm:text-[2.1rem]">
                {about.faithLead}
              </blockquote>
              <p className="lead mt-6">{about.faith}</p>
            </Reveal>
          </div>
          <Reveal delay={150} className="grid grid-cols-2 gap-4">
            {about.values.map((v, i) => (
              <div key={v} className={`flex aspect-square flex-col justify-between rounded-[2rem] p-6 ${i % 3 === 0 ? 'bg-royal text-white' : 'bg-surface text-royal-ink shadow-soft'}`}>
                <Flame size={22} className={i % 3 === 0 ? 'text-gold' : 'text-gold-deep'} />
                <span className="font-serif text-3xl font-semibold">{v}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Structure */}
      <section className="py-24">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-2">
            <SectionHead eyebrow="Leadership & Governance" title="Our Business & Academic Structure" />
            <Reveal delay={80} className="space-y-4 text-[17px] leading-relaxed text-ink-soft lg:pt-10">
              <p className="font-medium text-royal-ink">{about.structureLead}</p>
              <p>{about.structure}</p>
            </Reveal>
          </div>
          <p className="mt-14 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Our academic team is structured into specialized departments</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.departments.map((d, i) => (
              <Reveal key={d.name} delay={i * 70} data-tilt="5" className={`spotlight group relative h-full rounded-[2rem] border border-line bg-surface p-7 shadow-soft transition duration-500 ease-premium hover:-translate-y-1 hover:border-gold/60 hover:shadow-pop ${i === 0 ? 'lg:row-span-2 lg:flex lg:flex-col' : ''}`}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-soft text-royal-text transition group-hover:bg-royal group-hover:text-gold"><Icon name={d.icon} size={22} /></span>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-royal-ink">{d.name}</h3>
                {d.scope && <p className="text-[13px] font-semibold text-gold-deep">{d.scope}</p>}
                <p className="mt-2 text-ink-soft">{d.text}</p>
                {i === 0 && (
                  <div className="mt-6 hidden flex-1 overflow-hidden rounded-3xl bg-gold lg:block">
                    <img src={photos.girlSmile} alt="" loading="lazy" className="h-full min-h-[180px] w-full object-cover" />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
