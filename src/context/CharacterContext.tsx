import { createContext, useState, useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Character } from '../api/types'

type CharacterContextData = {
  characters: Character[] | null
  isLoading: boolean
  fetchCharacters: (status?: string, gender?: string) => Promise<void>
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

  const fetchCharacters = async (status?: string, gender?: string) => {
    setIsLoading(true)
    try {
      const params = {
        ...(status && { status }),
        ...(gender && { gender })
      }
      const response = await axios.get('https://rickandmortyapi.com/api/character', { params })
      const data = response.data.results
      setCharacters(data)
    } catch (error) {
      console.error('Error fetching characters:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <CharacterContext.Provider value={{ characters, isLoading, fetchCharacters }}>{children}</CharacterContext.Provider>
  )
}
