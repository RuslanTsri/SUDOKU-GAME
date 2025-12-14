import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Гра завершена!</h1>
            <p>Дякуємо за гру.</p>
            {/* Повертаємось на головну */}
            <button onClick={() => navigate('/')}>Грати знову</button>
        </div>
    );
};

export default ResultsPage;