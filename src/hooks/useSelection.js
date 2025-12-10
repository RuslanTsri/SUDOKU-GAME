import { useState, useCallback } from 'react';

export const useSelection = () => {
    const [selectedCell, setSelectedCell] = useState(null);

    const selectCell = useCallback((row, col) => {
        setSelectedCell({ row, col });
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedCell(null);
    }, []);

    return {
        selectedCell,
        selectCell,
        clearSelection
    };
};