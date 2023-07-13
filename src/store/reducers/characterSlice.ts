import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Filters, CharacterState } from './interfaces'
import { Character } from '../../api/types'

// Defining the initial state
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

// Creating the character slice
const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    // Reducer for setting filters
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload
    },
    // Reducer for setting characters
    setCharacters: (state, action: PayloadAction<{ characters: Character[]; append?: boolean }>) => {
      if (action.payload.append) {
        // If append is true, add new characters to existing ones
        state.characters = [...state.characters, ...action.payload.characters]
      } else {
        // Otherwise replace existing characters with new ones
        state.characters = action.payload.characters
      }
    },
    // Reducer for setting a single character
    setCharacter: (state, action: PayloadAction<Character | null>) => {
      state.character = action.payload
    },
    // Reducer for setting episodes
    setEpisodes: (state, action: PayloadAction<string[]>) => {
      state.episodes = action.payload
    },
    // Reducer for setting the next page URL
    setNextPageUrl: (state, action: PayloadAction<string>) => {
      state.nextPageUrl = action.payload
    },
    // Reducer for setting the loading state
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    // Reducer for setting the error state
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload
    }
  }
})

// Exporting the actions and the reducer
export const { setFilters, setCharacters, setNextPageUrl, setIsLoading, setCharacter, setEpisodes } =
  characterSlice.actions

export default characterSlice.reducer

export type { CharacterState }
