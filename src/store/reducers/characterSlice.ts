import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character } from '../../api/types'

interface Filters {
  status: string
  gender: string
}

interface CharacterState {
  filters: Filters
  characters: Character[]
  character: Character | null
  episodes: string[]
  nextPageUrl: string
  isLoading: boolean
  error: boolean
}

const initialState: CharacterState = {
  filters: {
    status: '',
    gender: ''
  },
  characters: [],
  character: null,
  episodes: [],
  nextPageUrl: '',
  isLoading: false,
  error: false
}

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload
      console.log(state.filters)
    },
    setCharacters: (state, action: PayloadAction<{ characters: Character[]; append?: boolean }>) => {
      if (action.payload.append) {
        state.characters = [...state.characters, ...action.payload.characters]
      } else {
        state.characters = action.payload.characters
      }
    },
    setCharacter: (state, action: PayloadAction<Character | null>) => {
      state.character = action.payload
    },
    setEpisodes: (state, action: PayloadAction<string[]>) => {
      state.episodes = action.payload
    },
    setNextPageUrl: (state, action: PayloadAction<string>) => {
      state.nextPageUrl = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload
    }
  }
})

export const { setFilters, setCharacters, setNextPageUrl, setIsLoading, setCharacter, setEpisodes } =
  characterSlice.actions

export default characterSlice.reducer

export type { CharacterState }
