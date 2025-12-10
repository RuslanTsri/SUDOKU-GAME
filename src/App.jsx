import { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import './styles/main.css';

function App() {
    const [page, setPage] = useState('start');
    //стан для зберігання обраної складності
    const [difficulty, setDifficulty] = useState('easy');

    const handleGameStart = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
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