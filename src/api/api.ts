import { useQuery } from 'react-query'
import axios from 'axios'
import { Character } from './types'

export const fetchCharacters = async (status?: string, gender?: string) => {
  const params = {
    ...(status && { status }),
    ...(gender && { gender })
  }

  const response = await axios.get('https://rickandmortyapi.com/api/character', { params })
  return response.data.results as Character[]
}

export const fetchCharacterById = async (id: number) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
  return response.data as Character
}

export const useCharacters = (status?: string, gender?: string) => {
  return useQuery(['characters', status, gender], () => fetchCharacters(status, gender))
}

export const useCharacterById = (id: number) => {
  return useQuery(['character', id], () => fetchCharacterById(id))
}
