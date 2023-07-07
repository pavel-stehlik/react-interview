import { useQuery } from 'react-query'
import { Character } from '../api/types'

export const useCharacters = () => {
  return useQuery<Character[]>('characters', async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json()
    return data.results
  })
}
