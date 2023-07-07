import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Filters {
  status: string
  gender: string
}

interface CharacterState {
  filters: Filters
}

const initialState: CharacterState = {
  filters: {
    status: '',
    gender: ''
  }
}

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload
    }
  }
})

export const { setFilters } = characterSlice.actions

export default characterSlice.reducer
