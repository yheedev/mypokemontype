import { create } from 'zustand'

export type BattleSentenceMode = 'Battle.modeEffectively' | 'Battle.modeGently'

interface BattleSentenceModeState {
  selectedMode: BattleSentenceMode
  setSelectedMode: (mode: BattleSentenceMode) => void
}

export const useBattleSentenceModeStore = create<BattleSentenceModeState>()((set) => ({
  selectedMode: 'Battle.modeEffectively',
  setSelectedMode: (mode) => set({ selectedMode: mode }),
}))
