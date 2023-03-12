import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character, IRequest } from 'api/types'

interface Response {
  info: { count: number; next: string; pages: number; prev: string }
  results: Character[]
}

export interface Characters {
  characters: Response
  page: number
  status: string
  filterStatus: string
  filterGender: string
}

export const initialState: Characters = {
  characters: { info: { count: 0, next: '', pages: 0, prev: '' }, results: [] },
  page: 1,
  status: 'loading',
  filterStatus: '',
  filterGender: ''
}

export const fetchCharacters = createAsyncThunk('characters/fetch', async (request: IRequest, thunkAPI) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${request.page}&status=${request.filterStatus}&gender=${request.filterGender}`,
    { method: 'GET' }
  )
    .then(res => res.json())
    .then(data => {
      return data
    })
    .catch(err => console.log(err))

  return response
})

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    increasePage(state) {
      state.page++
    },
    decreasePage(state) {
      state.page - 1
    },
    setFilterStatus(state, action: PayloadAction<string>) {
      state.filterStatus = action.payload
    },
    setFilterGender(state, action: PayloadAction<string>) {
      state.filterGender = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCharacters.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'success'
        state.characters = action.payload
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})

export const { increasePage, decreasePage, setFilterStatus, setFilterGender } = characterSlice.actions
export default characterSlice.reducer
