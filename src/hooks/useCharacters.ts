import { useQuery } from 'react-query'
import { fetchCharacters } from '../api/api'
import { Character } from '../api/types'

export const useCharacters = (status?: string, gender?: string) => {
  return useQuery<{ info: { next: string }; results: Character[] }>('characters', () => fetchCharacters(status, gender))
}
