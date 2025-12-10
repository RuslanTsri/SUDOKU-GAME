import React from 'react';


const Board = () => {
    const cells = Array.from({ length: 81 });

    return (
        // Використовуємо className замість style
        <div className="board">
            {cells.map((_, index) => (
                <div key={index} className="cell"></div>
            ))}
        </div>
    );
};

export default Board;