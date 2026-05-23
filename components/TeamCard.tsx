import Link from 'next/link'
import { Team } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function TeamCard({ team }: { team: Team }) {
  if (!team) return null

  const name = getMetafieldValue(team.metadata?.team_name) || team.title
  const description = getMetafieldValue(team.metadata?.description)
  const alignment = getMetafieldValue(team.metadata?.alignment)
  const emblem = team.metadata?.emblem

  const isHero = alignment.toLowerCase().includes('hero')
  const isVillain = alignment.toLowerCase().includes('villain')

  const gradientClass = isHero
    ? 'from-orange-500 via-red-500 to-yellow-500'
    : isVillain
    ? 'from-purple-700 via-violet-800 to-indigo-900'
    : 'from-slate-600 to-slate-800'

  return (
    <Link href={`/teams/${team.slug}`}>
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradientClass} comic-shadow border-4 border-black hover:scale-105 transition-all duration-300 group h-full p-6`}>
        {emblem && (
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30 group-hover:rotate-6 transition-transform">
            <img
              src={`${emblem.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
              alt={name}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h3 className="font-display text-3xl text-white tracking-wide text-center text-stroke">{name}</h3>
        {alignment && (
          <p className="text-center mt-2">
            <span className="inline-block bg-black/40 px-3 py-1 rounded-full text-sm font-bold text-white uppercase tracking-wider">
              {alignment}
            </span>
          </p>
        )}
        {description && (
          <p className="text-white/90 text-sm mt-4 text-center line-clamp-3">{description}</p>
        )}
      </div>
    </Link>
  )
}