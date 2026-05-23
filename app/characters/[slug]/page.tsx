// app/characters/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCharacterBySlug, getMetafieldValue } from '@/lib/cosmic'

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const character = await getCharacterBySlug(slug)

  if (!character) notFound()

  const name = getMetafieldValue(character.metadata?.character_name) || character.title
  const role = getMetafieldValue(character.metadata?.role)
  const power = character.metadata?.power_level || 0
  const bio = getMetafieldValue(character.metadata?.bio)
  const likes = getMetafieldValue(character.metadata?.likes)
  const specialPower = getMetafieldValue(character.metadata?.special_power)
  const team = character.metadata?.team
  const teamName = team ? (getMetafieldValue(team.metadata?.team_name) || team.title) : ''
  const alignment = team ? getMetafieldValue(team.metadata?.alignment) : ''
  const image = character.metadata?.character_image

  const isHero = alignment.toLowerCase().includes('hero')
  const isVillain = alignment.toLowerCase().includes('villain')

  const gradientClass = isHero
    ? 'from-orange-600 via-red-600 to-yellow-500'
    : isVillain
    ? 'from-purple-700 via-violet-800 to-indigo-900'
    : 'from-slate-700 to-slate-900'

  return (
    <div>
      <section className={`bg-gradient-to-br ${gradientClass} py-12 border-b-4 border-black`}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {image && (
            <div className="rounded-2xl overflow-hidden border-8 border-black comic-shadow">
              <img
                src={`${image.imgix_url}?w=1000&h=1000&fit=crop&auto=format,compress`}
                alt={name}
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          )}
          <div>
            <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider text-stroke mb-4">
              {name}
            </h1>
            {role && (
              <p className="text-xl font-bold text-yellow-300 uppercase tracking-wider mb-4">{role}</p>
            )}
            {teamName && (
              <Link href={`/teams/${team?.slug}`} className="inline-block bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full text-white font-bold mb-4 transition-colors">
                🛡️ {teamName}
              </Link>
            )}
            {power > 0 && (
              <div className="bg-black/40 rounded-xl p-4 mb-4">
                <div className="text-yellow-300 font-bold text-sm uppercase tracking-wider mb-1">Power Level</div>
                <div className="font-display text-5xl text-white text-stroke">⚡ {power}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {specialPower && (
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 border-4 border-black comic-shadow">
            <h2 className="font-display text-3xl text-white tracking-wider text-stroke mb-3">
              ⚡ Special Power
            </h2>
            <p className="text-white text-lg font-semibold">{specialPower}</p>
          </div>
        )}

        {bio && (
          <div className="bg-slate-800/80 rounded-2xl p-6 border-4 border-black comic-shadow">
            <h2 className="font-display text-3xl text-white tracking-wider text-stroke mb-3">
              📖 Bio
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">{bio}</p>
          </div>
        )}

        {likes && (
          <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-6 border-4 border-black comic-shadow">
            <h2 className="font-display text-3xl text-white tracking-wider text-stroke mb-3">
              ❤️ Likes
            </h2>
            <p className="text-white text-lg">{likes}</p>
          </div>
        )}

        <div className="text-center pt-6">
          <Link href="/characters" className="text-orange-400 hover:text-orange-300 font-bold uppercase tracking-wider">
            ← Back to Characters
          </Link>
        </div>
      </section>
    </div>
  )
}