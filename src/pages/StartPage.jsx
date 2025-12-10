import React from 'react';
import Button from '../components/UI/Button/Button';

const StartPage = ({ onGameStart }) => {
    return (
        <div>
            <h1>Судоку</h1>
            <p>Класична головоломка для тренування логіки.</p>
            {/* Використвання компоненту "Button" замість тегу */}
            <Button onClick={onGameStart}>Почати гру</Button>
        </div>
    );
};

export default StartPage;