import Link from 'next/link'
import { Battle } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function BattleCard({ battle }: { battle: Battle }) {
  if (!battle) return null

  const title = getMetafieldValue(battle.metadata?.battle_title) || battle.title
  const story = getMetafieldValue(battle.metadata?.story)
  const scene = battle.metadata?.battle_scene
  const winner = battle.metadata?.winner
  const winnerName = winner ? (getMetafieldValue(winner.metadata?.character_name) || winner.title) : ''
  const fighters = battle.metadata?.fighters || []

  return (
    <Link href={`/battles/${battle.slug}`}>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 comic-shadow border-4 border-black hover:scale-105 transition-all duration-300 group h-full">
        {scene && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`${scene.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5 bg-black/50 backdrop-blur-sm">
          <h3 className="font-display text-2xl text-white tracking-wide text-stroke">{title}</h3>
          {fighters.length > 0 && (
            <p className="text-sm text-orange-300 mt-2 font-semibold">
              👊 {fighters.length} fighter{fighters.length !== 1 ? 's' : ''}
            </p>
          )}
          {story && (
            <p className="text-white/80 text-sm mt-2 line-clamp-2">{story}</p>
          )}
          {winnerName && (
            <div className="mt-3 inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              🏆 Winner: {winnerName}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}