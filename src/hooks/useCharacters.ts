import { useQuery, useInfiniteQuery } from 'react-query'
import { fetchCharacters, fetchCharacterById } from '../api/api'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCharacter } from '../store/reducers/characterSlice' // import the action

export const useCharacters = (status?: string, gender?: string, characterId?: number) => {
  const dispatch = useDispatch()
  const [lastViewedCharacter, setLastViewedCharacter] = useState<number | null>(null)
  console.log(characterId)
  const fetchCharacterByIdFromApi = useQuery(
    ['character', characterId],
    () => (typeof characterId === 'number' ? fetchCharacterById(characterId) : null),
    {
      enabled: characterId !== null,
      onSuccess: data => {
        if (data) {
          dispatch(setCharacter(data))
        }
      }
    }
  )

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
    ['characters', status, gender],
    ({ pageParam = '' }) => fetchCharacters(status, gender, pageParam),
    {
      getNextPageParam: lastPage => lastPage.info.next || undefined
    }
  )

  return {
    characters: data?.pages.map(page => page.results).flat() ?? [],
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchCharacterById: fetchCharacterByIdFromApi,
    lastViewedCharacter,
    setLastViewedCharacter
  }
}
