import { configureStore } from '@reduxjs/toolkit'
import themeSlice, { Theme } from './reducers/theme'
import characterReducer from './reducers/characterSlice'

// Creating the Redux store
const store = configureStore({
  reducer: {
    theme: themeSlice,
    character: characterReducer
  }
})

// Defining the types for the AppStore and the AppDispatch
export type AppStore = {
  theme: Theme
}

export type AppDispatch = typeof store.dispatch

export default store
