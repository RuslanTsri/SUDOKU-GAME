import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button/Button';
import { useResultsStore } from '../store/useResultsStore';

const ResultsPage = () => {
    const navigate = useNavigate();

    const { results, clearResults } = useResultsStore();

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Таблиця рекордів 🏆</h1>

            {results.length === 0 ? (
                <p>Поки що немає результатів. Зіграйте першу гру!</p>
            ) : (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Гравець</th>
                        <th>Складність</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((res) => (
                        <tr key={res.id}>
                            <td>{res.date}</td>
                            <td>{res.name}</td>
                            <td>{res.difficulty}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Button onClick={() => navigate('/')}>На головну</Button>

                {results.length > 0 && (
                    <Button onClick={clearResults} variant="secondary">Очистити історію</Button>
                )}
            </div>
        </div>
    );
};

export default ResultsPage;