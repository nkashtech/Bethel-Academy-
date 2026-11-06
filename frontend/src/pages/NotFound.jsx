import { Link } from 'react-router-dom'
import { Crest } from '../components/ui'

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Crest className="w-28 opacity-90" />
      <h1 className="mt-6 font-serif text-5xl font-semibold text-royal-ink">Page not found</h1>
      <p className="mt-3 text-ink-soft">The page you're looking for has moved or doesn't exist.</p>
      <Link to="/" className="btn-gold mt-8">Back to the home page</Link>
    </section>
  )
}
