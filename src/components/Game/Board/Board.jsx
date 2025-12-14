import React from 'react';
import PropTypes from 'prop-types';
import styles from './Board.module.css';
import Cell from '../Cell/Cell.jsx';

const Board = ({ grid, initialGrid, selectedCell, onCellSelect, errors }) => {
    return (
        <div className={styles.board}>
            {grid.map((row, rowIndex) =>
                row.map((value, colIndex) => {
                    // Перевіряємо, чи є ця клітинка у списку помилок
                    const isError = errors.includes(`${rowIndex}-${colIndex}`);

                    // Перевіряємо, чи це початкова (фіксована) клітинка
                    const isInitial = initialGrid && initialGrid[rowIndex][colIndex] !== null;

                    return (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            value={value}
                            isInitial={isInitial} // ✅ Передаємо пропс
                            isError={isError}     // ✅ Передаємо пропс
                            isSelected={
                                selectedCell &&
                                selectedCell.row === rowIndex &&
                                selectedCell.col === colIndex
                            }
                            onClick={() => onCellSelect(rowIndex, colIndex)}
                        />
                    );
                })
            )}
        </div>
    );
};

Board.propTypes = {
    grid: PropTypes.array.isRequired,
    selectedCell: PropTypes.object,
    onCellSelect: PropTypes.func.isRequired,
};

export default Board;