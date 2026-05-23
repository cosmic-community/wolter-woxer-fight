import Link from 'next/link'
import { Character } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CharacterCard({ character }: { character: Character }) {
  if (!character) return null

  const name = getMetafieldValue(character.metadata?.character_name) || character.title
  const role = getMetafieldValue(character.metadata?.role)
  const power = character.metadata?.power_level || 0
  const team = character.metadata?.team
  const teamName = team ? (getMetafieldValue(team.metadata?.team_name) || team.title) : ''
  const alignment = team ? getMetafieldValue(team.metadata?.alignment) : ''
  const image = character.metadata?.character_image
  const specialPower = getMetafieldValue(character.metadata?.special_power)

  const isHero = alignment.toLowerCase().includes('hero')
  const isVillain = alignment.toLowerCase().includes('villain')

  const gradientClass = isHero
    ? 'from-orange-500 to-red-600'
    : isVillain
    ? 'from-purple-600 to-indigo-800'
    : 'from-slate-600 to-slate-800'

  return (
    <Link href={`/characters/${character.slug}`}>
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradientClass} comic-shadow border-4 border-black hover:scale-105 transition-all duration-300 group h-full`}>
        {image && (
          <div className="aspect-square overflow-hidden">
            <img
              src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-4 bg-black/40 backdrop-blur-sm">
          <h3 className="font-display text-2xl text-white tracking-wide text-stroke">{name}</h3>
          {role && (
            <p className="text-sm text-yellow-300 font-bold uppercase mt-1">{role}</p>
          )}
          {specialPower && (
            <p className="text-xs text-white/90 mt-2 line-clamp-2">⚡ {specialPower}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            {teamName && (
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white font-semibold">
                {teamName}
              </span>
            )}
            {power > 0 && (
              <span className="text-sm font-bold text-yellow-300">
                ⚡ {power}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}