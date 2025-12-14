import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Board from '../components/Game/Board/Board';
import { useSudokuBoard } from '../hooks/useSudokuBoard';
import { useSelection } from '../hooks/useSelection';
import { useResultsStore } from '../store/useResultsStore';

const GamePage = () => {
    const { difficulty, playerName } = useParams();
    const navigate = useNavigate();
    const addResult = useResultsStore((state) => state.addResult);

    const {
        grid,
        initialGrid,
        startNewGame,
        updateCell
    } = useSudokuBoard();

    const {
        selectedCell,
        selectCell
    } = useSelection();

    // 3. Старт гри
    useEffect(() => {
        if (difficulty) {
            startNewGame(difficulty);
        }
    }, [difficulty, startNewGame]);

    // 4. Обробка вводу
    const handleNumberInput = (number) => {
        if (selectedCell) {
            updateCell(selectedCell.row, selectedCell.col, number);
        }
    };

    const handleFinishGame = () => {
        addResult({
            name: playerName || 'Гість',
            difficulty: difficulty,
            status: 'Win'
        });

        navigate('/results');
    };

    if (!grid || !initialGrid) {
        return <div>Генерація поля...</div>;
    }

    return (
        <div>
            <h2>
                Гравець: {playerName || 'Гість'} | Складність: {difficulty}
            </h2>

            <Board
                grid={grid}
                initialGrid={initialGrid}
                selectedCell={selectedCell}
                onCellSelect={selectCell}
            />

            {/* Панель цифр */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button key={num} onClick={() => handleNumberInput(num)}>
                        {num}
                    </button>
                ))}
            </div>

            <button style={{ marginTop: '20px' }} onClick={handleFinishGame}>
                Завершити гру
            </button>
        </div>
    );
};

export default GamePage;