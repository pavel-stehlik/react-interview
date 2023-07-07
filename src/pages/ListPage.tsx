import { useHistory } from 'react-router-dom'
import { Typography } from '@mui/material'
import { CharacterFilters } from '../components/CharacterFilters'
import { CharacterCard } from '../components/CharacterCard'
import { useCharacterContext } from '../context/CharacterContext'

export const ListPage = () => {
  const history = useHistory()
  const { characters, isLoading, fetchCharacters } = useCharacterContext()

  const handleCharacterClick = (id: number) => {
    history.push(`/detail/${id}`, { prevPath: history.location.pathname })
  }

  const handleApplyFilters = (status: string, gender: string) => {
    fetchCharacters(status, gender)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <CharacterFilters onApplyFilters={handleApplyFilters} />
      {characters && characters.length > 0 ? (
        characters.map(character => (
          <CharacterCard key={character.id} character={character} onClick={handleCharacterClick} />
        ))
      ) : (
        <Typography>No characters found.</Typography>
      )}
    </div>
  )
}
