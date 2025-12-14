import { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import './styles/main.css'; // Якщо у вас є стилі

function App() {
    const [page, setPage] = useState('start');
    const [difficulty, setDifficulty] = useState('easy');

    // 👇 ВИПРАВЛЕННЯ ТУТ
    const handleGameStart = (formData) => {
        // formData приходить як: { playerName: 'Alex', difficulty: 'hard' }

        // Ми беремо ТІЛЬКИ difficulty, якщо прийшов об'єкт
        if (typeof formData === 'object') {
            setDifficulty(formData.difficulty);
        } else {
            // На випадок, якщо прийшов просто рядок (стара логіка)
            setDifficulty(formData);
        }

        setPage('game');
    };

    const renderCurrentPage = () => {
        switch (page) {
            case 'game':
                return <GamePage difficulty={difficulty} onGameEnd={() => setPage('results')} />;
            case 'results':
                return <ResultsPage onRestart={() => setPage('start')} />;
            case 'start':
            default:
                return <StartPage onGameStart={handleGameStart} />;
        }
    };

    return (
        <div className="app-container">
            {renderCurrentPage()}
        </div>
    );
}

export default App;