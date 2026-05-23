// app/teams/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getTeamBySlug, getCharactersByTeam, getMetafieldValue } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'
import Link from 'next/link'

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const team = await getTeamBySlug(slug)

  if (!team) notFound()

  const characters = await getCharactersByTeam(team.id)

  const name = getMetafieldValue(team.metadata?.team_name) || team.title
  const description = getMetafieldValue(team.metadata?.description)
  const alignment = getMetafieldValue(team.metadata?.alignment)
  const emblem = team.metadata?.emblem

  const isHero = alignment.toLowerCase().includes('hero')
  const isVillain = alignment.toLowerCase().includes('villain')

  const headerGradient = isHero
    ? 'from-orange-600 via-red-600 to-yellow-500'
    : isVillain
    ? 'from-purple-700 via-violet-800 to-indigo-900'
    : 'from-slate-700 to-slate-900'

  return (
    <div>
      <section className={`bg-gradient-to-br ${headerGradient} py-16 border-b-4 border-black`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          {emblem && (
            <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-8 border-white/30 comic-shadow">
              <img
                src={`${emblem.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider text-stroke mb-4">
            {name}
          </h1>
          {alignment && (
            <span className="inline-block bg-black/40 px-4 py-2 rounded-full text-white font-bold uppercase tracking-wider">
              {alignment}
            </span>
          )}
          {description && (
            <p className="text-xl text-white/90 max-w-2xl mx-auto mt-6">{description}</p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-display text-4xl text-white tracking-wider text-stroke mb-8">
          Team Members
        </h2>
        {characters.length === 0 ? (
          <p className="text-white/60 text-center text-xl py-12">No members yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/teams" className="text-orange-400 hover:text-orange-300 font-bold uppercase tracking-wider">
            ← Back to Teams
          </Link>
        </div>
      </section>
    </div>
  )
}