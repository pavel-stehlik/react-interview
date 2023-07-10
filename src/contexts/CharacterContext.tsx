import { createContext, useState, useContext, useEffect, useCallback } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Character } from '../api/types'

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

  const fetchCharacters = useCallback(async (status?: string, gender?: string) => {
    setIsLoading(true)
    try {
      const params = {
        ...(status && { status }),
        ...(gender && { gender })
      }
      const response = await axios.get('https://rickandmortyapi.com/api/character', { params })
      const data = response.data.results
      setCharacters(data)
      setNextPageUrl(response.data.info.next)
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
      const response = await axios.get(nextPageUrl)
      const newData = response.data.results
      setCharacters(prevCharacters => (prevCharacters ? [...prevCharacters, ...newData] : newData))
      setNextPageUrl(response.data.info.next)
    } catch (error) {
      console.error('Error fetching more characters:', error)
    } finally {
      setIsLoading(false)
    }
  }, [nextPageUrl])

  const fetchCharacterById = useCallback(async (id: number) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      return response.data as Character
    } catch (error) {
      console.error(`Error fetching character with id ${id}:`, error)
      return undefined
    }
  }, [])

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <CharacterContext.Provider
      value={{ characters, isLoading, fetchCharacters, fetchMoreCharacters, fetchCharacterById }}
    >
      {children}
    </CharacterContext.Provider>
  )
}
