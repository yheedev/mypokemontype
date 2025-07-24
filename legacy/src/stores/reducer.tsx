import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { darkModeSlice, darkModeState } from '../features/darkModeSlice'
import {
  offenseCalSlice,
  offenseCalState,
} from '../../../src/stores/useOffenseCalStore'
import { languageSlice, langState } from '../features/languageSlice'
import { upToTwoSlice, upToTwoState } from '../../../src/stores/useUpToTwoStore'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { defenseCalState, defenseCalSlice } from 'features/defenseCalSlice'

export type RootState = {
  darkMode: darkModeState
  language: langState
  upToTwo: upToTwoState
  offenseCal: offenseCalState
  defenseCal: defenseCalState
} & PersistPartial

export const persistConfig = {
  key: 'root',
  storage,
}

export const rootReducer = combineReducers({
  darkMode: darkModeSlice.reducer,
  language: languageSlice.reducer,
  upToTwo: upToTwoSlice.reducer,
  offenseCal: offenseCalSlice.reducer,
  defenseCal: defenseCalSlice.reducer,
})

export const persistedReducer = persistReducer(persistConfig, rootReducer)
export default persistedReducer
