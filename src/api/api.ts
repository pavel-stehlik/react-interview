import axios from 'axios'
import { Character } from './types'

export const fetchCharacters = async (status?: string, gender?: string) => {
  const params = {
    ...(status && { status }),
    ...(gender && { gender })
  }

  const response = await axios.get('https://rickandmortyapi.com/api/character', { params })
  return response.data as { info: { next: string }; results: Character[] }
}

export const fetchCharacterById = async (id: number) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
  return response.data as Character
}
