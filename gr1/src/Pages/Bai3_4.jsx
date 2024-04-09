import React, { useState, useEffect } from 'react';
import './Bai3_4.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faCat, faFishFins } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export const Bai3_4 = () => {
    const [mazeInput, setMazeInput] = useState('');
    const [catPosition, setCatPosition] = useState({row: 8, col: 3});
    const [fishPosition, setFishPosition] = useState({row: 0, col: 4});
    const [waterPosition, setWaterPosition] = useState([{row: 1, col: 3}, {row: 1, col: 4}, {row: 1, col: 5}, {row: 3, col: 0}, {row: 3, col: 1}, {row: 3, col: 2}, {row: 3, col: 3}, {row: 3, col: 4}, {row: 6, col: 2}, {row: 6, col: 3}, {row: 6, col: 4}, {row: 6, col: 5}])

    const [maze, setMaze] = useState(() => {
        // Tạo bản đồ
        const initialMaze = Array(9).fill().map(() => Array(6).fill(""));   
        // Thêm mèo vào maze
        initialMaze[catPosition.row][catPosition.col] = "cat";
        // Thêm cá vào maze
        initialMaze[fishPosition.row][fishPosition.col] = "fish";
        // Thêm nước vào maze
        waterPosition.forEach(({row, col}) => {
            initialMaze[row][col] = "water";
        });
        return initialMaze;
    });

    const renderBoard = () => {
        return (
            <div className="board">
                {maze.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div key={`${rowIndex}-${colIndex}`} className="boxes">
                                {cell === 'fish' && <FontAwesomeIcon icon={faFishFins} color='#111' />}
                                {cell === 'water' && <FontAwesomeIcon icon={faWater} color='blue' />}
                                {cell === 'cat' && <FontAwesomeIcon icon={faCat} color='#111' />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleControll();
        setMazeInput('')
    }

    const showAnswer = () => {
        setMazeInput(`l\nl\nu\nu\nu\nu\nr\nr\nr\nr\nu\nu\nl\nl\nl\nu\nu\nr\nr`);
    }

    const handleControll = () => {
        const moves = mazeInput.split("\n");
        
        let updatedMaze = [...maze];
        let updatedCatPosition = { ...catPosition };
        for (let i = 0; i < moves.length; i++) {
            switch (moves[i]) {
                case 'l':
                    if (updatedCatPosition.col > 0 && maze[updatedCatPosition.row][updatedCatPosition.col - 1] !== 'water') {
                        updatedMaze[updatedCatPosition.row][updatedCatPosition.col] = '';
                        updatedCatPosition.col -= 1;
                    }
                    break;
                case 'r':
                    if (updatedCatPosition.col < maze[0].length - 1 && maze[updatedCatPosition.row][updatedCatPosition.col + 1] !== 'water') {
                        updatedMaze[updatedCatPosition.row][updatedCatPosition.col] = '';
                        updatedCatPosition.col += 1;
                    }
                    break;
                case 'u':
                    if (updatedCatPosition.row > 0 && maze[updatedCatPosition.row - 1][updatedCatPosition.col] !== 'water') {
                        updatedMaze[updatedCatPosition.row][updatedCatPosition.col] = '';
                        updatedCatPosition.row -= 1;
                    }
                    break;
                case 'd':
                    if (updatedCatPosition.col < maze.length - 1 && maze[updatedCatPosition.row + 1][updatedCatPosition.col] !== 'water') {
                        updatedMaze[updatedCatPosition.row][updatedCatPosition.col] = '';
                        updatedCatPosition.row += 1;
                    }
                    break;
                default:
                    break;
            }

            if (updatedCatPosition.row === fishPosition.row && updatedCatPosition.col === fishPosition.col) {
                updatedMaze[updatedCatPosition.row][updatedCatPosition.col] = 'cat';
                setMaze(updatedMaze);
                Swal.fire({
                    title: 'Chiến thắng!',
                    text: 'Mèo đã bắt được cá',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                return;
            }

            setCatPosition(updatedCatPosition);
            updatedMaze[updatedCatPosition.row][updatedCatPosition.col] = 'cat';
            setMaze(updatedMaze);
        }
    }

    return (
        <div className="Bai3">
            <h1>Bài 3: Vẽ mê cung</h1>
            <div className="container">
                {renderBoard()}
                <form className='form' onSubmit={handleSubmit}>
                    <textarea
                        name="mazeData"
                        placeholder="Nhập dữ liệu của mê cung ở đây..."
                        rows={10}
                        cols={50}
                        value={mazeInput}
                        onChange={e => setMazeInput(e.target.value)}
                        required
                    />
                    <div className="box-btn">
                        <button className="btn" type="submit">
                            Run
                        </button>
                        <button className="btn" type="button" onClick={showAnswer}>
                            Show Answer
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};
