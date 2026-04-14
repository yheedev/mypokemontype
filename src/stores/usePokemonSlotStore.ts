import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type TypeNameElement } from '@/constants/pokemon'

export interface PokemonSlotData {
  displayName: string
  englishName: string
  imageUrl: string | null // null = 타입만 수동 선택한 상태 (포켓몬 없음)
  types: TypeNameElement[]
}

interface PokemonSlotState {
  slotA: PokemonSlotData | null
  foe: PokemonSlotData | null
  activeSlot: 'A' | 'B' | null
  isLeftAttacker: boolean
  setSlot: (slot: 'A' | 'B', data: PokemonSlotData) => void
  clearSlot: (slot: 'A' | 'B') => void
  setActiveSlot: (slot: 'A' | 'B') => void
  forceActiveSlot: (slot: 'A' | 'B') => void
  clearActiveSlot: () => void
  toggleDirection: () => void
}

export const usePokemonSlotStore = create<PokemonSlotState>()(
  persist(
    (set) => ({
      slotA: null,
      foe: null,
      activeSlot: null,
      isLeftAttacker: true,

      setSlot: (slot, data) =>
        set(slot === 'A' ? { slotA: data } : { foe: data }),

      clearSlot: (slot) =>
        set(slot === 'A' ? { slotA: null } : { foe: null }),

      setActiveSlot: (slot) =>
        set((state) => ({
          activeSlot: state.activeSlot === slot ? null : slot,
        })),

      forceActiveSlot: (slot) => set({ activeSlot: slot }),

      clearActiveSlot: () => set({ activeSlot: null }),

      toggleDirection: () =>
        set((state) => ({ isLeftAttacker: !state.isLeftAttacker })),
    }),
    {
      name: 'mypkmn-pokemon-slot',
      partialize: (s) => ({ slotA: s.slotA, foe: s.foe }),
      skipHydration: true,
    },
  ),
)
