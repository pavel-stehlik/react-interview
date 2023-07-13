import { Character } from '../../api/types'

export interface Filters {
  status: string
  gender: string
}

export interface CharacterState {
  filters: Filters
  characters: Character[]
  character: Character | null
  episodes: string[]
  nextPageUrl: string
  isLoading: boolean
  error: boolean
}
