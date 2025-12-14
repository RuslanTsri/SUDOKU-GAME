import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/UI/Modal/Modal';
import Button from '../components/UI/Button/Button';
import Board from '../components/Game/Board/Board';

import { useSudokuBoard } from '../hooks/useSudokuBoard';
import { useSelection } from '../hooks/useSelection';
import { useResultsStore } from '../store/useResultsStore'; // Для запису рекорду

const GamePage = () => {
    const { difficulty, playerName } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Стор рекордів
    const addResult = useResultsStore((state) => state.addResult);

    // Логіка гри
    const {
        grid,
        initialGrid,
        startNewGame,
        updateCell,
        isSolved,
        errors // Отримуємо помилки
    } = useSudokuBoard();

    // Логіка виділення
    const { selectedCell, selectCell } = useSelection();

    // Старт гри при завантаженні
    useEffect(() => {
        const level = ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'easy';
        startNewGame(level);
    }, [difficulty, startNewGame]);

    // Відкриття модалки при перемозі
    useEffect(() => {
        if (isSolved) {
            setIsModalOpen(true);
        }
    }, [isSolved]);

    // ✅ ОБРОБКА КЛАВІАТУРИ
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedCell || isSolved) return;

            const { row, col } = selectedCell;
            const key = e.key;

            // Цифри 1-9
            if (key >= '1' && key <= '9') {
                updateCell(row, col, parseInt(key));
            }
            // Видалення (Backspace або Delete)
            else if (key === 'Backspace' || key === 'Delete') {
                updateCell(row, col, null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, isSolved, updateCell]);


    const handleNumberClick = (number) => {
        if (selectedCell) {
            updateCell(selectedCell.row, selectedCell.col, number);
        }
    };

    const handleFinishGame = () => {
        // Якщо виграли - записуємо результат
        if (isSolved) {
            addResult({
                name: playerName || 'Гість',
                difficulty: difficulty,
                status: 'Win'
            });
        }
        navigate('/results');
    };

    if (!grid || !initialGrid) {
        return <div>Генерація поля...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h2>Гравець: {playerName} | Рівень: {difficulty}</h2>

            <Board
                grid={grid}
                initialGrid={initialGrid} // ✅ Передаємо стартову сітку
                selectedCell={selectedCell}
                onCellSelect={selectCell}
                errors={errors} // ✅ Передаємо масив помилок
            />

            {/* Панель цифр */}
            <div style={{ display: 'flex', gap: '5px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(num)}
                        style={{ width: '40px', height: '40px', fontSize: '18px' }}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => navigate('/')} variant="secondary">Меню</Button>
                {/* Кнопка "Здатися" просто веде на результати без запису перемоги */}
                <Button onClick={() => navigate('/results')}>Здатися</Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 style={{ color: 'green' }}>Перемога! 🎉</h2>
                <p>Вітаємо, {playerName}! Ви вирішили судоку.</p>
                <Button onClick={handleFinishGame}>Записати результат</Button>
            </Modal>
        </div>
    );
};

export default GamePage;