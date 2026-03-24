import { create } from 'zustand'
import { type TypeNameElement } from '@/constants/pokemon'

export interface PokemonSlotData {
  displayName: string
  englishName: string
  imageUrl: string | null // null = 타입만 수동 선택한 상태 (포켓몬 없음)
  types: TypeNameElement[]
}

interface PokemonSlotState {
  slotA: PokemonSlotData | null
  slotB: PokemonSlotData | null
  activeSlot: 'A' | 'B' | null
  isLeftAttacker: boolean
  setSlot: (slot: 'A' | 'B', data: PokemonSlotData) => void
  clearSlot: (slot: 'A' | 'B') => void
  setActiveSlot: (slot: 'A' | 'B') => void
  clearActiveSlot: () => void
  toggleDirection: () => void
}

export const usePokemonSlotStore = create<PokemonSlotState>((set) => ({
  slotA: null,
  slotB: null,
  activeSlot: null,
  isLeftAttacker: true,

  setSlot: (slot, data) =>
    set(slot === 'A' ? { slotA: data } : { slotB: data }),

  clearSlot: (slot) =>
    set(slot === 'A' ? { slotA: null } : { slotB: null }),

  setActiveSlot: (slot) =>
    set((state) => ({
      activeSlot: state.activeSlot === slot ? null : slot,
    })),

  clearActiveSlot: () => set({ activeSlot: null }),

  toggleDirection: () =>
    set((state) => ({ isLeftAttacker: !state.isLeftAttacker })),
}))
