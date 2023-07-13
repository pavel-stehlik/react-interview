import { useQuery, useInfiniteQuery } from 'react-query'
import { fetchCharacters, fetchCharacterById } from '../api/api'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCharacter } from '../store/reducers/characterSlice'

// Custom hook to fetch characters from an API
export const useCharacters = (status?: string, gender?: string, characterId?: number) => {
  // Create a dispatch function
  const dispatch = useDispatch()

  // Keep track of the last viewed character
  const [lastViewedCharacter, setLastViewedCharacter] = useState<number | null>(null)

  // Fetch character by Id
  const fetchCharacterByIdFromApi = useQuery(
    ['character', characterId], // unique identifier (key) for the query
    // query function: fetch character only if characterId is defined and is a number
    () => (typeof characterId === 'number' ? fetchCharacterById(characterId) : null),
    {
      // The query will not run automatically unless the characterId is not null
      enabled: characterId !== null,
      // onSuccess: function to execute when the fetch is successful
      onSuccess: data => {
        // Dispatch the character to the Redux store if data exists
        if (data) {
          dispatch(setCharacter(data))
        }
      }
    }
  )

  // Fetch a list of characters with pagination
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
    ['characters', status, gender], // unique identifier (key) for the query
    // query function: fetch characters based on status and gender
    ({ pageParam = '' }) => fetchCharacters(status, gender, pageParam),
    {
      // Function to determine the next page parameter
      getNextPageParam: lastPage => lastPage.info.next || undefined
    }
  )

  // Return all necessary data for the components
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
