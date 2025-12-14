import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cell.module.css';

const Cell = ({ value, isSelected, isInitial, isError, onClick }) => {
    // Формуємо список класів залежно від пропсів
    const cellClasses = `
        ${styles.cell} 
        ${isSelected ? styles.selected : ''} 
        ${isInitial ? styles.initial : ''} 
        ${isError ? styles.error : ''}
    `;

    return (
        <div className={cellClasses} onClick={onClick}>
            {value === null ? '' : value}
        </div>
    );
};

Cell.propTypes = {
    value: PropTypes.number,
    isSelected: PropTypes.bool,
    isInitial: PropTypes.bool,
    isError: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default Cell;