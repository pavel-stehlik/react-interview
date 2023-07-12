import { configureStore } from '@reduxjs/toolkit'
import themeSlice, { Theme } from './reducers/theme'
import characterReducer from './reducers/characterSlice'

const store = configureStore({
  reducer: {
    theme: themeSlice,
    character: characterReducer
  }
})

export type AppStore = {
  theme: Theme
}

export type AppDispatch = typeof store.dispatch

export default store
