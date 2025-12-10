import { useState, useCallback } from 'react';
import { generateSudoku } from '../utils/sudoku';

export const useSudokuBoard = () => {
    // Стан для поточної сітки
    const [grid, setGrid] = useState(null);
    // Стан для початкової сітки
    const [initialGrid, setInitialGrid] = useState(null);
    // Стан для перевірки, чи гра завершена
    const [isSolved, setIsSolved] = useState(false);

    // 1. Початок нової гри
    const startNewGame = useCallback((difficulty) => {
        const newSudoku = generateSudoku(difficulty);
        setGrid(newSudoku.puzzle);
        setInitialGrid(newSudoku.puzzle);
        setIsSolved(false);
    }, []);

    // 2. Оновлення клітинки (Тільки логіка даних!)
    const updateCell = useCallback((row, col, value) => {
        if (!grid || !initialGrid) return;
        if (initialGrid[row][col] !== null) return;

        setGrid(prevGrid => {
            const newGrid = prevGrid.map(r => [...r]);
            newGrid[row][col] = value;
            return newGrid;
        });
    }, [grid, initialGrid]);

    return {
        grid,
        initialGrid,
        isSolved,
        setIsSolved,
        startNewGame,
        updateCell
    };
};