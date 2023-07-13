import { CharacterState } from './characterSlice'

export const selectCharacters = (state: { character: CharacterState }) => state.character.characters
export const selectNextPageUrl = (state: { character: CharacterState }) => state.character.nextPageUrl
export const selectIsLoading = (state: { character: CharacterState }) => state.character.isLoading
export const selectFilters = (state: { character: CharacterState }) => state.character.filters
export const selectCharacter = (state: { character: CharacterState }) => state.character.character
export const selectEpisodes = (state: { character: CharacterState }) => state.character.episodes
