import React, { useState, useEffect } from 'react';
import './Bai2.scss';
import all_bai2_img from '../Assets/all_bai2_img';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Bai2 = () => {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
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
        console.log(newData);
        setData(newData);
    }; 

    const renderBoard = () => {
        return (
            <div className="board">
                {data.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div key={`${rowIndex}-${colIndex}`} className="boxes">
                                <img src={all_bai2_img[`bai2_img_${rowIndex * cols + colIndex + 1}`]} alt={`Image ${rowIndex * cols + colIndex + 1}`} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="Bai2">
            <h1>Bài 2: Hiển thị ảnh (image) theo lưới (Grid)​</h1>
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
            <ToastContainer />
        </div>
    );
};
