import { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import './styles/main.css'; // Підключаємо стилі

function App() {
    // 'start', 'game', 'results' - це наші базові стани
    const [page, setPage] = useState('start');

    const renderCurrentPage = () => {
        switch (page) {
            case 'game':
                return <GamePage onGameEnd={() => setPage('results')} />;
            case 'results':
                return <ResultsPage onRestart={() => setPage('start')} />;
            case 'start':
            default:
                return <StartPage onGameStart={() => setPage('game')} />;
        }
    };

    return (
        <div className="app-container">
            {renderCurrentPage()}
        </div>
    );
}

export default App;