import { useParams } from 'react-router-dom'
import { useCharacterById } from '../api/api'

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const characterId = parseInt(id, 10)
  const { data: character, isLoading } = useCharacterById(characterId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!character) {
    return <div>Character not found</div>
  }

  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </div>
  )
}
