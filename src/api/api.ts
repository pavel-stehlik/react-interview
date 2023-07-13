import axios from 'axios'
import { Character } from './types'

export const fetchCharacters = async (status?: string, gender?: string, pageUrl?: string) => {
  const params = {
    ...(status && { status }),
    ...(gender && { gender })
  }

  const url = pageUrl || 'https://rickandmortyapi.com/api/character'

  const response = await axios.get(url, { params })
  return response.data as { info: { next: string }; results: Character[] }
}

export const fetchCharacterById = async (id: number) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
  return response.data as Character
}
