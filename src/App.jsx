import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles/main.css';

function App() {
    return (
        <div className="app-container">
            {/* Сюди роутер вставить StartPage або GamePage */}
            <Outlet />
        </div>
    );
}

export default App;