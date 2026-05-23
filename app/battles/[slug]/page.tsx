// app/battles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBattleBySlug, getMetafieldValue } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'

export default async function BattlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const battle = await getBattleBySlug(slug)

  if (!battle) notFound()

  const title = getMetafieldValue(battle.metadata?.battle_title) || battle.title
  const story = getMetafieldValue(battle.metadata?.story)
  const scene = battle.metadata?.battle_scene
  const winner = battle.metadata?.winner
  const winnerName = winner ? (getMetafieldValue(winner.metadata?.character_name) || winner.title) : ''
  const fighters = battle.metadata?.fighters || []

  return (
    <div>
      <section className="relative">
        {scene && (
          <div className="relative h-96 md:h-[500px] overflow-hidden border-b-4 border-black">
            <img
              src={`${scene.imgix_url}?w=2400&h=1000&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 max-w-6xl mx-auto">
              <h1 className="font-display text-5xl md:text-8xl text-white tracking-wider text-stroke">
                {title}
              </h1>
            </div>
          </div>
        )}
        {!scene && (
          <div className="bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 py-16 text-center border-b-4 border-black">
            <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider text-stroke">
              {title}
            </h1>
          </div>
        )}
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        {winnerName && (
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-6 border-4 border-black comic-shadow text-center">
            <div className="text-black font-bold text-sm uppercase tracking-widest mb-2">🏆 Winner</div>
            <div className="font-display text-4xl md:text-5xl text-white text-stroke">{winnerName}</div>
          </div>
        )}

        {story && (
          <div className="bg-slate-800/80 rounded-2xl p-8 border-4 border-black comic-shadow">
            <h2 className="font-display text-3xl text-white tracking-wider text-stroke mb-4">
              📜 The Story
            </h2>
            <p className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap">{story}</p>
          </div>
        )}

        {fighters.length > 0 && (
          <div>
            <h2 className="font-display text-4xl text-white tracking-wider text-stroke mb-6">
              👊 Fighters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fighters.map((fighter) => (
                <CharacterCard key={fighter.id} character={fighter} />
              ))}
            </div>
          </div>
        )}

        <div className="text-center pt-6">
          <Link href="/battles" className="text-orange-400 hover:text-orange-300 font-bold uppercase tracking-wider">
            ← Back to Battles
          </Link>
        </div>
      </section>
    </div>
  )
}