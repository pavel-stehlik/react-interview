import { createContext, useState, useContext, useEffect, useCallback } from 'react'
import { Character } from '../api/types'
import { fetchCharacters, fetchCharacterById } from '../api/api'

type CharacterContextData = {
  characters: Character[] | null
  isLoading: boolean
  fetchCharacters: (status?: string, gender?: string) => Promise<void>
  fetchMoreCharacters: () => Promise<void>
  fetchCharacterById: (id: number) => Promise<Character | undefined>
}

const CharacterContext = createContext<CharacterContextData | undefined>(undefined)

export const useCharacterContext = () => {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterProvider')
  }
  return context
}

export const CharacterProvider: React.FC = ({ children }) => {
  const [characters, setCharacters] = useState<Character[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)

  const fetchCharactersFromApi = useCallback(async (status?: string, gender?: string) => {
    setIsLoading(true)
    try {
      const { results, info } = await fetchCharacters(status, gender)
      setCharacters(results)
      setNextPageUrl(info.next)
    } catch (error) {
      console.error('Error fetching characters:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchMoreCharacters = useCallback(async () => {
    if (!nextPageUrl) return

    setIsLoading(true)
    try {
      const { results, info } = await fetchCharacters()
      setCharacters(prevCharacters => (prevCharacters ? [...prevCharacters, ...results] : results))
      setNextPageUrl(info.next)
    } catch (error) {
      console.error('Error fetching more characters:', error)
    } finally {
      setIsLoading(false)
    }
  }, [nextPageUrl])

  const fetchCharacterByIdFromApi = useCallback(async (id: number) => {
    try {
      return await fetchCharacterById(id)
    } catch (error) {
      console.error(`Error fetching character with id ${id}:`, error)
      return undefined
    }
  }, [])

  useEffect(() => {
    fetchCharactersFromApi()
  }, [fetchCharactersFromApi])

  return (
    <CharacterContext.Provider
      value={{
        characters,
        isLoading,
        fetchCharacters: fetchCharactersFromApi,
        fetchMoreCharacters,
        fetchCharacterById: fetchCharacterByIdFromApi
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}
