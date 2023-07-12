import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { fetchCharacters, fetchCharacterById } from '../api/api'
import {
  setCharacters,
  setNextPageUrl,
  setIsLoading,
  setCharacter,
  setEpisodes
} from '../store/reducers/characterSlice'

import {
  selectCharacters,
  selectNextPageUrl,
  selectIsLoading,
  selectCharacter,
  selectEpisodes,
  selectFilters
} from '../store/reducers/characterSelectors'
import { useCallback, useEffect } from 'react'

export const useCharacters = (status?: string, gender?: string) => {
  const dispatch = useDispatch()
  const characters = useSelector(selectCharacters)
  const nextPageUrl = useSelector(selectNextPageUrl)
  const isLoading = useSelector(selectIsLoading)

  const fetchCharacterByIdFromApi = useCallback(
    async (id: number) => {
      try {
        const character = await fetchCharacterById(id)
        if (character) {
          dispatch(setCharacter(character))
          dispatch(setEpisodes(character.episode))
        }
      } catch (error) {
        console.error(`Error fetching character with id ${id}:`, error)
      }
    },
    [dispatch]
  )

  const fetchCharactersFromApi = useCallback(async () => {
    dispatch(setIsLoading(true))
    try {
      const { results, info } = await fetchCharacters(status, gender)
      dispatch(setCharacters({ characters: results }))
      dispatch(setNextPageUrl(info.next))
    } catch (error) {
      console.error('Error fetching characters:', error)
    } finally {
      console.log('useCharacters fetchMoreCharacters: ', isLoading)
      dispatch(setIsLoading(false))
    }
  }, [dispatch, status, gender, characters])

  const fetchMoreCharacters = useCallback(async () => {
    if (!nextPageUrl) return
    console.log('useCharacters fetchMoreCharacters: ', isLoading)

    dispatch(setIsLoading(true))
    try {
      const { results, info } = await fetchCharacters(undefined, undefined, nextPageUrl)
      if (results.length === 0) {
        return
      }
      dispatch(setCharacters({ characters: results, append: true }))
      dispatch(setNextPageUrl(info.next))
    } catch (error) {
      console.log('useCharacters fetchMoreCharacters is loading: ', isLoading)
      console.error('Error fetching more characters:', error)
    } finally {
      console.log('useCharacters fetchMoreCharacters is loading: ', isLoading)
      dispatch(setIsLoading(false))
    }
  }, [dispatch, nextPageUrl, fetchCharacters])

  return {
    characters,
    isLoading,
    fetchCharacters: fetchCharactersFromApi,
    fetchMoreCharacters,
    fetchCharacterById: fetchCharacterByIdFromApi
  }
}
