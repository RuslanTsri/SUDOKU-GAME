import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Board from '../components/Board/Board';


import { useSudokuBoard } from '../hooks/useSudokuBoard';
import { useSelection } from '../hooks/useSelection';

const GamePage = ({ difficulty, onGameEnd }) => {
    // 2. Хук №1: Відповідає ТІЛЬКИ за сітку та правила гри
    const {
        grid,
        initialGrid,
        startNewGame,
        updateCell
    } = useSudokuBoard();

    // 3. Хук №2: Відповідає ТІЛЬКИ за візуальне виділення клітинки
    const {
        selectedCell,
        selectCell
    } = useSelection();

    useEffect(() => {
        startNewGame(difficulty);
    }, [difficulty, startNewGame]);

    const handleNumberInput = (number) => {
        if (selectedCell) {
            updateCell(selectedCell.row, selectedCell.col, number);
        }
    };

    if (!grid || !initialGrid) {
        return <div>Генерація поля...</div>;
    }

    return (
        <div>
            <h2>Складність: {difficulty}</h2>
            <Board
                grid={grid}
                initialGrid={initialGrid}
                selectedCell={selectedCell}
                onCellSelect={selectCell}
            />

            <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button key={num} onClick={() => handleNumberInput(num)}>
                        {num}
                    </button>
                ))}
            </div>

            <button style={{ marginTop: '20px' }} onClick={onGameEnd}>
                Завершити гру
            </button>
        </div>
    );
};

GamePage.propTypes = {
    difficulty: PropTypes.string.isRequired,
    onGameEnd: PropTypes.func.isRequired,
};

export default GamePage;