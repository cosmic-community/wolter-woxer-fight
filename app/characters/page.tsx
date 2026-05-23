import { getAllCharacters } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'

export default async function CharactersPage() {
  const characters = await getAllCharacters()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider text-stroke mb-4">
          🦸 CHARACTERS
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Meet every fighter in this epic war
        </p>
      </div>

      {characters.length === 0 ? (
        <div className="text-center text-white/60 py-12">
          <p className="text-2xl">No characters found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      )}
    </div>
  )
}