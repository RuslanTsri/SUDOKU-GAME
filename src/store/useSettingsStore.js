import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
    persist(
        (set) => ({
            settings: {
                playerName: '',
                difficulty: 'easy',
            },

            setSettings: (newSettings) => set((state) => ({
                settings: { ...state.settings, ...newSettings }
            })),

            resetSettings: () => set({ settings: { playerName: '', difficulty: 'easy' } }),
        }),
        {
            name: 'sudoku-settings-storage', 
        }
    )
);