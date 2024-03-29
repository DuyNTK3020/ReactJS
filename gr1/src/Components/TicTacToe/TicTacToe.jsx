import React, { useState, useEffect } from 'react';
import './TicTacToe.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle} from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(10);
    const [data, setData] = useState([]);

    useEffect(() => {
        initializeData(rows, cols);
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newRows = parseInt(e.target.row.value);
        const newCols = parseInt(e.target.col.value);
        setRows(newRows);
        setCols(newCols);
        toast.success(`Đã chỉnh sửa lại thành bảng ${newRows}x${newCols}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        initializeData(newRows, newCols);
    };

    const initializeData = (rows, cols) => {
        const newData = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push('');
            }
            newData.push(row);
        }
        setData(newData);
    };

    const toggle = (row, col) => {
        if (lock || data[row][col] !== '') {
            return;
        }
        const newData = [...data];
        newData[row][col] = count % 2 === 0 ? 'o' : 'x';
        setData(newData);
        if (checkWin(row, col)) {
            Swal.fire(`${count % 2 === 0 ? 'o' : 'x'} wins!`);
            setLock(true);
        } else {
            setCount(count + 1);
        }
    };    

    const renderBoard = () => {
        return (
            <div className="board">
                {data.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div key={`${rowIndex}-${colIndex}`} className="boxes" onClick={() => toggle(rowIndex, colIndex)}>
                                {cell === 'o' && <FontAwesomeIcon icon={faCircle} color='red' />}
                                {cell === 'x' && <FontAwesomeIcon icon={faTimes} color='blue' />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const checkWin = (row, col) => {
        const currentPlayer = count % 2 === 0 ? 'o' : 'x';
        
        // Kiểm tra hàng ngang
        let countRow = 1;
        for (let i = col - 1; i >= 0 && data[row][i] === currentPlayer; i--) countRow++;
        for (let i = col + 1; i < cols && data[row][i] === currentPlayer; i++) countRow++;
        if (countRow >= 5) return true;
        
        // Kiểm tra hàng dọc
        let countCol = 1;
        for (let i = row - 1; i >= 0 && data[i][col] === currentPlayer; i--) countCol++;
        for (let i = row + 1; i < rows && data[i][col] === currentPlayer; i++) countCol++;
        if (countCol >= 5) return true;
        
        // Kiểm tra đường chéo chính
        let countMainDiagonal = 1;
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0 && data[i][j] === currentPlayer; i--, j--) countMainDiagonal++;
        for (let i = row + 1, j = col + 1; i < rows && j < cols && data[i][j] === currentPlayer; i++, j++) countMainDiagonal++;
        if (countMainDiagonal >= 5) return true;
        
        // Kiểm tra đường chéo phụ
        let countSubDiagonal = 1;
        for (let i = row - 1, j = col + 1; i >= 0 && j < cols && data[i][j] === currentPlayer; i--, j++) countSubDiagonal++;
        for (let i = row + 1, j = col - 1; i < rows && j >= 0 && data[i][j] === currentPlayer; i++, j--) countSubDiagonal++;
        if (countSubDiagonal >= 5) return true;
        
        return false;
    };
    


    const handleReset = () => {
        setCount(0);
        setLock(false);
        initializeData(rows, cols);
    };

    return (
        <div className="container">
            <h1 className="title">Tic Tac Toe Game In <span>React</span></h1>
            <form onSubmit={handleFormSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name">Hàng</label>
                    <input type="number" id="row" name="row" required />
                </div>

                <div className="form-group">
                    <label htmlFor="id">Cột</label>
                    <input type="number" id="col" name="col" required />
                </div>

                <div className="form-group form-btn">
                    <button className="btn" type="submit">
                        Chỉnh sửa
                    </button>
                </div>
            </form>
            {renderBoard()}
            <button className="btn" onClick={handleReset}>Reset</button>
            <ToastContainer />
        </div>
    );
};
