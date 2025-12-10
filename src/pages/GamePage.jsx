import React from 'react';
// Імпортуємо плейсхолдер для дошки
import Board from '../components/Board/Board';

const GamePage = ({ onGameEnd }) => {
    return (
        <div>
            <h2>Ігрове поле</h2>
            <Board />
            <button onClick={onGameEnd}>Завершити гру (для тесту)</button>
        </div>
    );
};

export default GamePage;