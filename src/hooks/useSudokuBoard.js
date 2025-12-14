import { useState, useCallback, useEffect } from 'react';
import { generateSudoku } from '../utils/sudoku';

export const useSudokuBoard = () => {
    const [grid, setGrid] = useState(null);
    const [initialGrid, setInitialGrid] = useState(null);
    const [solution, setSolution] = useState(null); // ✅ Зберігаємо правильну відповідь
    const [isSolved, setIsSolved] = useState(false);
    const [errors, setErrors] = useState([]); // ✅ Масив координат помилок

    const startNewGame = useCallback((difficulty) => {
        const newSudoku = generateSudoku(difficulty);
        setGrid(newSudoku.puzzle);
        setInitialGrid(newSudoku.puzzle);
        setSolution(newSudoku.solution); // ✅ Запам'ятовуємо рішення
        setIsSolved(false);
        setErrors([]); // Скидаємо помилки
    }, []);

    const updateCell = useCallback((row, col, value) => {
        if (!grid || !initialGrid || isSolved) return;
        // Забороняємо змінювати початкові цифри
        if (initialGrid[row][col] !== null) return;

        setGrid(prevGrid => {
            const newGrid = prevGrid.map(r => [...r]);
            newGrid[row][col] = value;
            return newGrid;
        });
    }, [grid, initialGrid, isSolved]);

    useEffect(() => {
        if (!grid || !solution) return;

        const isFull = grid.every(row => row.every(cell => cell !== null));

        if (isFull) {
            const newErrors = [];
            let isCorrect = true;

            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) {
                    if (grid[r][c] !== solution[r][c]) {
                        isCorrect = false;
                        newErrors.push(`${r}-${c}`);
                    }
                }
            }

            if (isCorrect) {
                setIsSolved(true);
                setErrors([]);
            } else {
                setErrors(newErrors);
            }
        } else {
            if (errors.length > 0) setErrors([]);
        }
    }, [grid, solution]);

    return {
        grid,
        initialGrid,
        isSolved,
        errors, // Експортуємо помилки
        startNewGame,
        updateCell
    };
};