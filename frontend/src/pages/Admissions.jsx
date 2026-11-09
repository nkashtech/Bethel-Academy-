import { Clock, Mail, MessageCircle, Phone, Video } from 'lucide-react'
import { photos, school, telHref } from '../content/site'
import { PageHero } from '../components/ui'
import { ApplicationForm, ConsultationForm } from '../components/Forms'

export default function Admissions() {
  const contacts = [
    { icon: Mail, label: 'Email', value: school.email, href: `mailto:${school.email}` },
    ...school.phones.map((n, i) => ({ icon: Phone, label: i === 0 ? 'Phone (Main Line)' : 'Phone', value: n, href: telHref(n) })),
    { icon: MessageCircle, label: 'WhatsApp', value: school.phones[0], href: `https://wa.me/${school.whatsapp}` },
    { icon: Clock, label: 'Office Hours', value: school.officeHours },
  ]
  return (
    <>
      <PageHero eyebrow="Admissions & Contact" title="Join Bethel House of God Academy" subtitle="Enrollment & Consultation Enquiries" crumb="Admissions & Contact" photo={photos.boyUniform}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#apply" className="btn-gold">Start the application</a>
          <a href="#consultation" className="btn-outline-light">Book a Free Consultation</a>
        </div>
      </PageHero>

      <section className="py-20">
        <div className="wrap grid items-start gap-8 lg:grid-cols-[1.45fr_1fr]">
          {/* Application */}
          <div id="apply" className="scroll-mt-28 rounded-[2.25rem] border border-line bg-surface p-6 shadow-soft sm:p-10">
            <p className="eyebrow"><span className="h-px w-6 bg-current" />Enrollment Application Form</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-royal-ink">Apply for your child</h2>
            <p className="mb-8 mt-2 text-ink-soft">Fill in the form below to begin the application process for your child.</p>
            <ApplicationForm />
          </div>

          <div className="space-y-6">
            {/* Direct contact */}
            <div className="relative overflow-hidden rounded-[2.25rem] bg-royal p-8 text-white">
              <div className="stripes absolute inset-0 [--stripe:0.1]" />
              <div className="relative">
                <h2 className="font-serif text-3xl font-semibold">Direct Contact Details</h2>
                <ul className="mt-6 space-y-4">
                  {contacts.map((c) => {
                    const inner = (
                      <>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold"><c.icon size={20} /></span>
                        <span>
                          <span className="block text-[12px] font-semibold uppercase tracking-wider text-white/55">{c.label}</span>
                          <span className="block font-medium">{c.value}</span>
                        </span>
                      </>
                    )
                    return (
                      <li key={c.label + c.value}>
                        {c.href ? <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-2xl transition hover:text-gold-bright">{inner}</a> : <div className="flex items-center gap-4">{inner}</div>}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            {/* Consultation */}
            <div id="consultation" className="scroll-mt-28 rounded-[2.25rem] border-2 border-gold/50 bg-gold-cream p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-royal px-3 py-1 text-[12px] font-bold text-white"><Video size={14} className="text-gold" /> Virtual Consultation</span>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-royal-ink">Book a 15-Minute Zoom Consultation</h2>
              <p className="mb-6 mt-2 text-[15px] text-ink-soft">Ask about grades, subjects, fees or the exam pathway. It's free.</p>
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
