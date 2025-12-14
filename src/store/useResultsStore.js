import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useResultsStore = create(
    persist(
        (set) => ({
            results: [],

            addResult: (result) => set((state) => ({
                results: [
                    {
                        id: Date.now(),
                        date: new Date().toLocaleString(),
                        ...result
                    },
                    ...state.results
                ].slice(0, 10)
            })),

            clearResults: () => set({ results: [] }),
        }),
        {
            name: 'sudoku-results-storage',
        }
    )
);