import { useHistory } from 'react-router-dom'
import { Typography, Button, CircularProgress } from '@mui/material'
import { CharacterFilters } from '../components/CharacterFilters'
import { CharacterCard } from '../components/CharacterCard'
import { useCharacterContext } from '../context/CharacterContext'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/reducers/characterSlice'
import InfiniteScroll from 'react-infinite-scroll-component'

export const ListPage = () => {
  const history = useHistory()
  const { characters, isLoading, fetchCharacters, fetchMoreCharacters } = useCharacterContext()
  const dispatch = useDispatch()

  const handleCharacterClick = (id: number) => {
    history.push(`/detail/${id}`, { prevPath: history.location.pathname })
  }

  const handleApplyFilters = (status: string, gender: string) => {
    dispatch(setFilters({ status, gender }))
    fetchCharacters(status, gender)
  }

  const handleLoadMore = () => {
    fetchMoreCharacters()
  }

  if (isLoading && !characters) {
    return <CircularProgress />
  }

  return (
    <div>
      <CharacterFilters onApplyFilters={handleApplyFilters} />
      <InfiniteScroll
        dataLength={characters ? characters.length : 0}
        next={handleLoadMore}
        hasMore={!!characters?.length}
        loader={<CircularProgress />}
      >
        {characters && characters.length > 0 ? (
          characters.map(character => (
            <CharacterCard key={character.id} character={character} onClick={handleCharacterClick} />
          ))
        ) : (
          <Typography>No characters found.</Typography>
        )}
      </InfiniteScroll>
    </div>
  )
}
