import React, { useState, useEffect } from 'react';
import './Bai3_4.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faCat, faFishFins } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const catPosition = { row: null, col: null };
const fishPosition = { row: null, col: null };
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

export const Bai3_4 = () => {
    const [mazeInput, setMazeInput] = useState('');
    const [mazeState, setMazeState] = useState(JSON.parse(JSON.stringify(maze)));

    useEffect(() => {
        // Lấy vị trí ban đầu của cat và fish trong map
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
    },[])

    const notifiError = (move) => {
        toast.error(`Bạn đã đâm vào vật cản bên ${move}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

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
        setMazeInput('');
    };

    const showAnswer = () => {
        setMazeInput(`l\nl\nu\nu\nu\nu\nr\nr\nr\nu\nu\nl\nl\nu\nu\nr\nr`);
    }

    const handleControl = async (event) => {
        const moves = event.target.mazeData.value.split("\n");

        for (let i = 0; i < moves.length; i++) {
            const updatedMazeState = [...mazeState];
            updatedMazeState[catPosition.row][catPosition.col] = '';

            switch (moves[i]) {
                case 'l':
                    if (catPosition.col > 0 && updatedMazeState[catPosition.row][catPosition.col - 1] !== 'water') {
                        catPosition.col -= 1;
                    } else {
                        notifiError("trái");
                    }
                    break;
                case 'r':
                    if (catPosition.col < updatedMazeState[0].length - 1 && updatedMazeState[catPosition.row][catPosition.col + 1] !== 'water') {
                        catPosition.col += 1;
                    } else {
                        notifiError("phải");
                    }
                    break;
                case 'u':
                    if (catPosition.row > 0 && updatedMazeState[catPosition.row - 1][catPosition.col] !== 'water') {
                        catPosition.row -= 1;
                    } else {
                        notifiError("trên");
                    }
                    break;
                case 'd':
                    if (catPosition.row < updatedMazeState.length - 1 && updatedMazeState[catPosition.row + 1][catPosition.col] !== 'water') {
                        catPosition.row += 1;
                    } else {
                        notifiError("dưới");
                    }
                    break;
                default:
                    break;
            }

            updatedMazeState[catPosition.row][catPosition.col] = 'cat';
            setMazeState([...updatedMazeState]);

            if (catPosition.row === fishPosition.row && catPosition.col === fishPosition.col) {
                Swal.fire({
                    title: 'Chiến thắng!',
                    text: 'Mèo đã bắt được cá',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    const handlePlayAgain = () => {
        // Tạo một bản sao của maze để cập nhật trạng thái
        const newMazeState = [...maze];
        // Cập nhật mazeState
        setMazeState(JSON.parse(JSON.stringify(maze)));
        maze.forEach((row, rowIndex) => {
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
        console.log('Play Again')
        console.log(mazeState)
        console.log(newMazeState)
        console.log(catPosition)
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
                    <div className="btn-group">
                        <button className="btn" type="submit">
                            Run
                        </button>
                        <button className="btn" type="button" onClick={showAnswer}>
                            Show Answer
                        </button>
                        <button className="btn" type="button" onClick={handlePlayAgain}>
                            Play Again
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};