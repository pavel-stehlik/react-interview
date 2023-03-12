import { configureStore } from '@reduxjs/toolkit'
import themeSlice, { Theme } from 'store/reducers/theme'
import characterSlice, { Characters } from './reducers/character'

const store = configureStore({
  reducer: {
    theme: themeSlice,
    character: characterSlice
  }
})

export type AppStore = {
  theme: Theme
  character: Characters
}

export default store
