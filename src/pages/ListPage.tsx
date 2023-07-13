import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Typography, CircularProgress } from '@mui/material'
import { CharacterFilters } from '../components/CharacterFilters'
import { CharacterCard } from '../components/CharacterCard'
import { useCharacters } from '../hooks/useCharacters'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../store/reducers/characterSlice'
import { selectFilters, selectCharacters } from '../store/reducers/characterSelectors'
import { ScrollToTopButton } from '../components/ScrollToTopButton'
import { Character } from '../api/types'
import { useEffect } from 'react'

export const ListPage = () => {
  const history = useHistory()
  const filters = useSelector(selectFilters)
  // const { characters, isLoading, fetchMoreCharacters, fetchCharacters } = useCharacters(filters.status, filters.gender)
  const dispatch = useDispatch()

  const { characters, isFetching, fetchNextPage, hasNextPage, setLastViewedCharacter } = useCharacters(
    filters.status,
    filters.gender
  )

  // const handleCharacterClick = (id: number) => {
  //   setLastViewedCharacter(id)
  //   history.push(`/detail/${id}`, { prevPath: history.location.pathname })
  // }

  // const handleCharacterClick = (id: number) => {
  //   history.push(`/detail/${id}`, { prevPath: history.location.pathname })
  // }¨

  const handleCharacterClick = (id: number) => {
    setLastViewedCharacter(id)
    history.push(`/detail/${id}`, { prevPath: history.location.pathname })
  }

  const handleApplyFilters = (status: string, gender: string) => {
    dispatch(setFilters({ status, gender }))
  }

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <div>
      <CharacterFilters onApplyFilters={handleApplyFilters} />
      <InfiniteScroll
        dataLength={characters.length}
        next={handleLoadMore}
        hasMore={characters.length > 0}
        loader={<h4>Loading ...</h4>}
      >
        <>
          {characters.length > 0 ? (
            characters.map((character: Character, index: number) => (
              <CharacterCard key={`${character.id}-${index}`} character={character} onClick={handleCharacterClick} />
            ))
          ) : (
            <Typography>No characters found.</Typography>
          )}
        </>
      </InfiniteScroll>
      <ScrollToTopButton />
    </div>
  )
}
