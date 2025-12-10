import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/UI/Button/Button';

const StartPage = ({ onGameStart }) => {
    // Стан для обраної складності
    const [difficulty, setDifficulty] = useState('easy');

    return (
        <div>
            <h1>Судоку</h1>
            <p>Оберіть рівень складності:</p>
            <div>
                {/* Кнопки для вибору складності */}
                <Button onClick={() => setDifficulty('easy')}>Легко</Button>
                <Button onClick={() => setDifficulty('medium')}>Середнє</Button>
                <Button onClick={() => setDifficulty('hard')}>Складно</Button>
            </div>
            <p>Обрана складність: {difficulty}</p>
            {/* Передача обраної складності при старті гри */}
            <Button onClick={() => onGameStart(difficulty)}>Почати гру</Button>
        </div>
    );
};

StartPage.propTypes = {
    onGameStart: PropTypes.func.isRequired,
};

export default StartPage;