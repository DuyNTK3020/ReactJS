import React, { useState, useEffect } from 'react';
import './Bai3_4.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faCat, faFishFins } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export const Bai3_4 = () => {
    const maze = [
        ["", "", "", "", "fish", ""],
        ["", "", "", "water", "water", "water"],
        ["", "", "", "", "", ""],
        ["water", "water", "water", "water", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "water", "water", "water", "water"],
        ["", "", "", "", "", ""],
        ["", "", "", "cat", "", ""]
    ];

    const [mazeState, setMazeState] = useState(maze);
    const [mazeData, setMazeData] = useState('');

    const renderBoard = () => {
        return (
            <div className="board">
                {mazeState.map((row, rowIndex) => (
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

    const handleSubmit = (event) => {
        event.preventDefault();
        handleControl(event);
    };

    const showAnswer = () => {
        setMazeData('llllllllll');
    }
    

    const handleControl = async (event) => {
        const moves = event.target.mazeData.value.split("\n");

        let catPosition = { row: null, col: null };
        let fishPosition = { row: null, col: null };

        mazeState.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 'cat') {
                    catPosition.row = rowIndex;
                    catPosition.col = colIndex;
                } else if (cell === 'fish') {
                    fishPosition.row = rowIndex;
                    fishPosition.col = colIndex;
                }
            });
        });

        // Move the cat towards the fish without touching water
        for (let i = 0; i < moves.length; i++) {
            // Remove the cat from its old position
            mazeState[catPosition.row][catPosition.col] = '';

            switch (moves[i]) {
                case 'l':
                    if (catPosition.col > 0 && mazeState[catPosition.row][catPosition.col - 1] !== 'water') {
                        catPosition.col -= 1;
                    }
                    break;
                case 'r':
                    if (catPosition.col < mazeState[0].length - 1 && mazeState[catPosition.row][catPosition.col + 1] !== 'water') {
                        catPosition.col += 1;
                    }
                    break;
                case 'u':
                    if (catPosition.row > 0 && mazeState[catPosition.row - 1][catPosition.col] !== 'water') {
                        catPosition.row -= 1;
                    }
                    break;
                case 'd':
                    if (catPosition.row < mazeState.length - 1 && mazeState[catPosition.row + 1][catPosition.col] !== 'water') {
                        catPosition.row += 1;
                    }
                    break;
                default:
                    break;
            }

            if (catPosition.row === fishPosition.row && catPosition.col === fishPosition.col) {
                mazeState[catPosition.row][catPosition.col] = 'cat';
                setMazeState([...mazeState]);
                Swal.fire({
                    title: 'Chiến thắng!',
                    text: 'Bạn đã đưa mèo đến gần cá!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                return;
            }

            const updatedMaze = [...mazeState];
            updatedMaze[catPosition.row][catPosition.col] = 'cat';
            updatedMaze[fishPosition.row][fishPosition.col] = 'fish';

            setMazeState(updatedMaze);

            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

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
                        // required
                    />
                    <div className="box-btn">
                        <button className="btn" type="submit">
                            Run
                        </button>
                        <button className="btn" onClick={showAnswer}>
                            Auto Complete
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};
