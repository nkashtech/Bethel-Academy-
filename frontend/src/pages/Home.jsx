import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BookOpen, GraduationCap, MonitorPlay, Plus, Sparkles } from 'lucide-react'
import { faqs, home, pathways, photos, school, subjects } from '../content/site'
import { Crest, CheckList, Counter, GoldFlakes, Icon, Marquee, Reveal, SectionHead, Spotlight, Swash, Words } from '../components/ui'
import { EnquiryForm } from '../components/Forms'
import Story from '../components/Story'

// Staggered capsule photo columns, coloured from the crest. Each column drifts with the cursor at its own depth.
function HeroCollage() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return
    let raf
    const on = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5
        el.querySelectorAll('[data-depth]').forEach((n) => {
          const d = Number(n.dataset.depth)
          n.style.transform = `translate3d(${x * d}px, ${y * d}px, 0)`
        })
      })
    }
    window.addEventListener('pointermove', on)
    return () => { window.removeEventListener('pointermove', on); cancelAnimationFrame(raf) }
  }, [])

  const pill = 'group/pill overflow-hidden rounded-full shadow-pop ring-1 ring-black/5'
  const img = 'h-full w-full object-cover transition duration-700 ease-premium group-hover/pill:scale-110'
  const col = 'absolute flex flex-col gap-4 transition-transform duration-700 ease-out'
  return (
    <div ref={ref} className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[560px]">
      <div className="dots absolute inset-6 rounded-[3rem]" />
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-gold/40" />

      <div data-depth="18" className={`${col} left-[2%] top-[14%] w-[30%]`}>
        <div className={`${pill} h-56 animate-fade-up bg-gold [animation-delay:200ms] sm:h-72`}><img src={photos.girlLaptop} alt="Learner smiling at her laptop" className={img} /></div>
        <div className={`${pill} h-32 animate-fade-up bg-royal [animation-delay:450ms] sm:h-40`}><img src={photos.boyUniform} alt="" className={img} /></div>
      </div>
      <div data-depth="-12" className={`${col} left-[35%] top-0 w-[30%]`}>
        <div className="grid h-40 animate-fade-up place-items-center rounded-full border-4 border-gold/70 bg-paper shadow-glow sm:h-48">
          <Crest className="w-[70%]" />
        </div>
        <div className={`${pill} h-60 animate-fade-up bg-gold-soft [animation-delay:300ms] sm:h-72`}><img src={photos.girlsTablet} alt="Two learners working on a tablet" className={img} /></div>
      </div>
      <div data-depth="26" className={`${col} left-[68%] top-[9%] w-[30%]`}>
        <div className={`${pill} h-44 animate-fade-up bg-royal-soft [animation-delay:350ms] sm:h-56`}><img src={photos.teenGirl} alt="" className={img} /></div>
        <div className={`${pill} h-52 animate-fade-up bg-gold [animation-delay:550ms] sm:h-64`}><img src={photos.graduateKid} alt="Young graduate in cap and gown" className={img} /></div>
      </div>

      <div data-depth="40" className="absolute -left-2 bottom-10 transition-transform duration-700 ease-out sm:-left-10">
        <div className="flex animate-drift items-center gap-3 rounded-2xl border border-line bg-surface/90 p-3 pr-5 shadow-pop backdrop-blur-xl">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal text-gold"><MonitorPlay size={22} /></span>
          <span className="leading-tight">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Powered by</span>
            <span className="block font-serif text-lg font-bold text-royal-ink">Edubridge E-Learning</span>
          </span>
        </div>
      </div>
      <div data-depth="-30" className="absolute -right-1 top-1 transition-transform duration-700 ease-out">
        <div className="flex animate-drift items-center gap-2 rounded-full bg-royal-night px-4 py-2 text-[13px] font-semibold text-white shadow-pop ring-1 ring-white/10 [animation-delay:-3s]">
          <GraduationCap size={17} className="text-gold" /> Cambridge pathway
        </div>
      </div>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[2rem] border border-line bg-surface shadow-soft">
      {faqs.map((f, i) => {
        const on = open === i
        return (
          <Reveal key={f.q} delay={i * 60}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(on ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-serif text-xl font-semibold text-royal-ink transition hover:text-gold-deep sm:px-8 sm:text-[1.4rem]"
              >
                {f.q}
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition duration-500 ease-premium ${on ? 'rotate-45 border-gold bg-gold text-[#0F2438]' : 'border-line text-ink-muted'}`}><Plus size={18} /></span>
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" className={`grid transition-[grid-template-rows] duration-500 ease-premium ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-ink-soft sm:px-8">{f.a}</p>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

const phaseTint = ['bg-gold', 'bg-royal', 'bg-gold-deep', 'bg-royal-night']

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      {/* Follows the visitor's theme. A gold light follows the cursor. */}
      <section
        className="grain relative overflow-hidden bg-canvas text-ink"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--hx', `${e.clientX - r.left}px`)
          e.currentTarget.style.setProperty('--hy', `${e.clientY - r.top}px`)
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-[1] transition-[background] duration-300" style={{ background: 'radial-gradient(600px circle at var(--hx, 70%) var(--hy, 40%), rgb(212 168 83 / 0.16), transparent 60%)' }} />
        <div className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-gold-soft/80 blur-3xl dark:bg-gold/10" />
        <div className="absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-royal-soft blur-3xl dark:bg-royal/30" />
        <div className="stripes absolute inset-y-0 right-0 w-1/2 [--stripe:0.05] [mask-image:linear-gradient(to_left,black,transparent)]" />
        {/* Giant outlined monogram behind the collage */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-[4vw] top-1/2 z-[1] hidden -translate-y-[55%] select-none font-serif text-[30vw] font-bold leading-none tracking-tight lg:block" style={{ WebkitTextStroke: '1px rgb(212 168 83 / 0.3)', color: 'transparent' }}>
          BHGA
        </div>
        <GoldFlakes count={20} seed={7} className="z-[1]" />
        <div className="wrap relative z-[2] grid min-h-[calc(100vh-8.5rem)] items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_1fr] lg:pb-20">
          <div>
            <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-gold/40 bg-surface/80 px-3.5 py-1.5 text-[13px] font-semibold text-royal-ink shadow-soft backdrop-blur">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-gold" /></span>
              Now enrolling · Grade R – Grade 10
            </p>
            <h1 className="mt-6 font-serif text-[3.1rem] font-semibold leading-[0.98] text-royal-ink sm:text-7xl xl:text-[5.8rem]">
              <Words text="Real Christian Values," start={150} />
              <span className="relative inline-block whitespace-nowrap italic">
                <Words text="Real Life" start={450} className="foil pr-1" />
                <Swash className="absolute -bottom-2 left-0 h-4 w-[92%] sm:-bottom-3 sm:h-5" delay={1000} />
              </span>{' '}
              <Words text="Education" start={600} />
            </h1>
            <p className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-ink-soft [animation-delay:800ms]">{home.hero.sub}</p>
            <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:950ms]">
              <Link to="/academics" className="btn-gold">Explore Our Programs <ArrowRight size={17} /></Link>
              <Link to="/fees" className="btn-outline" data-magnetic>View Fee Structure</Link>
            </div>
            <dl className="mt-12 grid max-w-lg animate-fade-up grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface/70 py-5 shadow-soft backdrop-blur [animation-delay:1100ms]">
              {[
                [<Counter key="g" to={11} />, 'Grades, R to 10'],
                [<Counter key="p" to={4} />, 'Learning pathways'],
                [<Counter key="a" to={24} suffix="/7" />, 'Edubridge access'],
              ].map(([n, l]) => (
                <div key={l} className="px-3 text-center">
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-serif text-4xl font-bold text-royal-text">{n}</dd>
                  <dd className="mt-0.5 text-[12px] font-medium text-ink-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroCollage />
        </div>

        {/* Subjects ribbon */}
        <div className="relative z-[2] border-y border-line/70 bg-surface/60 py-5 text-royal-ink backdrop-blur">
          <Marquee items={subjects} className="skew-velocity" />
        </div>
      </section>

      {/* 2. Welcome */}
      <section className="relative py-28">
        <div className="wrap grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal from="left" className="relative mx-auto w-full max-w-md">
            <div className="stripes absolute -inset-4 rounded-[3rem] [--stripe:0.25]" />
            <Reveal from="clip" className="group relative overflow-hidden rounded-[2.5rem] bg-royal shadow-pop">
              <img src={photos.studentReading} alt="Learner in school uniform reading a book" className="h-[480px] w-full object-cover transition duration-[1.2s] ease-premium group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-night/50 via-transparent to-transparent" />
            </Reveal>
            <div className="absolute -bottom-8 -right-4 w-48 animate-drift rounded-3xl border border-line bg-surface/95 p-5 text-center shadow-pop backdrop-blur sm:-right-10">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-paper"><Crest className="w-16" /></div>
              <p className="mt-3 font-serif text-[15px] italic leading-snug text-royal-ink">{school.motto}</p>
            </div>
          </Reveal>
          <div>
            <SectionHead eyebrow="Welcome" title={<>Welcome to Bethel House of God Academy <span className="foil">(BHGA)</span></>} />
            <Reveal delay={200}>
              <p className="mt-7 border-l-2 border-gold pl-5 font-serif text-[1.65rem] italic leading-snug text-royal-text">“We nurture the whole child: academically, spiritually, and morally.”</p>
              <p className="lead mt-6">{home.welcome}</p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[['BookOpen', 'Academically'], ['Heart', 'Spiritually'], ['Compass', 'Morally']].map(([i, t], n) => (
                <Reveal key={t} from="scale" delay={300 + n * 100}>
                  <div className="group flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition duration-500 ease-premium hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-soft">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft text-gold-deep transition duration-500 group-hover:rotate-[-8deg] group-hover:bg-gold group-hover:text-[#0F2438]"><Icon name={i} size={18} /></span>
                    <span className="font-semibold text-royal-ink">{t}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={600}><Link to="/about" className="group mt-9 inline-flex items-center gap-2 font-semibold text-royal-text transition hover:text-gold-deep">More about us <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link></Reveal>
          </div>
        </div>
      </section>

      {/* 3. The BHGA Advantage */}
      <section className="grain relative overflow-hidden bg-royal py-28 text-white dark:bg-royal-deep">
        <div className="stripes absolute -left-10 top-0 h-full w-1/3 [--stripe:0.12] [mask-image:linear-gradient(to_right,black,transparent)]" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="wrap relative z-[2]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead light eyebrow="Why families choose us" title="The BHGA Advantage" />
            <Reveal from="right"><Link to="/exam-guide" className="btn-outline-light">How the exam pathway works <ArrowUpRight size={16} /></Link></Reveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {home.advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 110} from={i % 2 ? 'right' : 'left'}>
                <Spotlight data-tilt="4" className="glass group relative h-full rounded-[2rem] p-7 transition duration-500 ease-premium [--spot:0.25] hover:-translate-y-1 hover:border-gold/40 sm:p-9">
                  <div className="flex items-start gap-5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-bright to-gold text-[#0F2438] shadow-glow transition duration-500 ease-premium group-hover:-rotate-6 group-hover:scale-110"><Icon name={a.icon} size={26} /></span>
                    <div>
                      <h3 className="pr-12 font-serif text-[1.75rem] font-semibold leading-tight">{a.title}</h3>
                      <p className="mt-3 leading-relaxed text-white/75">{a.text}</p>
                      {a.link && <Link to={a.link} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-gold-bright transition hover:text-white">Explore the platform <ArrowRight size={15} /></Link>}
                    </div>
                  </div>
                  <span className="absolute right-7 top-6 font-serif text-5xl font-bold text-white/10 transition duration-500 group-hover:text-gold/30">0{i + 1}</span>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Learning pathways */}
      <section className="py-28">
        <div className="wrap">
          <SectionHead center eyebrow="From Grade R to IGCSE" title="Our Learning Pathways at a Glance">
            One clear path for every stage, with transparent monthly tuition and a once-off {school.registrationFee} registration fee.
          </SectionHead>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {pathways.map((p, i) => (
              <Reveal key={p.id} delay={i * 110} className="h-full">
                <Link to={`/academics#${p.id}`} data-tilt="6" className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface shadow-soft transition duration-500 ease-premium hover:-translate-y-2 hover:border-gold/50 hover:shadow-pop">
                  <div className={`relative h-48 overflow-hidden ${phaseTint[i]}`}>
                    <img src={photos[p.photo]} alt="" loading="lazy" className="h-full w-full object-cover transition duration-[1.2s] ease-premium group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-night/80 via-royal-night/10 to-transparent" />
                    <span className="absolute bottom-3 left-4 rounded-full bg-paper/95 px-3 py-1 text-[12px] font-bold text-[#14304A] backdrop-blur">{p.grades}</span>
                    <span className="absolute right-4 top-4 font-serif text-4xl font-bold text-white/30">0{i + 1}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-[1.7rem] font-semibold leading-tight text-royal-ink">{p.phase}</h3>
                    {p.stage && <p className="text-[13px] text-ink-muted">{p.stage}</p>}
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-soft">{p.summary}</p>
                    <div className="mt-6 flex items-end justify-between border-t border-dashed border-line pt-5">
                      <p>
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Monthly fee</span>
                        <span className="font-serif text-3xl font-bold text-royal-text">{p.fee}</span>
                      </p>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-soft text-royal-ink transition duration-500 ease-premium group-hover:rotate-45 group-hover:bg-gold group-hover:text-[#0F2438]" aria-hidden="true">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How it works: a pinned, chapter-by-chapter scroll story */}
      <Story />

      {/* FAQ */}
      <section className="py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Good to know" title="Questions parents ask">
              Straight answers about accreditation, grades, exams and fees.
            </SectionHead>
            <Reveal delay={250}>
              <Link to="/exam-guide" className="btn-outline mt-8">Read the full exam guide <ArrowRight size={16} /></Link>
            </Reveal>
          </div>
          <Faq />
        </div>
      </section>

      {/* 6. Lead capture */}
      <section id="enquire" className="pb-28">
        <div className="wrap">
          <Reveal from="scale" className="gilded grid overflow-hidden rounded-[2.75rem] bg-surface shadow-pop lg:grid-cols-[0.85fr_1.15fr]">
            <div className="grain relative overflow-hidden bg-royal p-8 text-white sm:p-12 dark:bg-royal-deep">
              <div className="stripes absolute inset-0 [--stripe:0.14]" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
              <div className="relative z-[2]">
                <p className="eyebrow-light"><span className="h-px w-8 bg-current" />Admissions</p>
                <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">Begin Your Child's Journey to Academic &amp; Character Excellence</h2>
                <p className="mt-5 text-white/80">Fill in your details below and our admissions coordinator will get in touch with you.</p>
                <CheckList light className="mt-8" items={['A reply within one working day', 'Guidance on the right grade and subjects', 'No obligation to enroll']} />
                <div className="mt-10 flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper"><Crest className="w-9" /></div>
                  <p className="font-serif text-lg italic text-white/90">{school.motto}</p>
                </div>
              </div>
            </div>
            <div className="p-8 sm:p-12">
              <h3 className="flex items-center gap-2 font-serif text-3xl font-semibold text-royal-ink"><BookOpen size={24} className="text-gold-deep" /> Admission Enquiry</h3>
              <p className="mb-7 mt-1 flex items-center gap-1.5 text-[14px] text-ink-muted"><Sparkles size={14} className="text-gold-deep" /> Takes under a minute. Fields marked * are required.</p>
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
