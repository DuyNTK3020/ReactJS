import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Index } from './Pages/Index';
import { Bai1 } from './Pages/Bai1';
import { Bai2 } from './Pages/Bai2';
import { Bai3_4 } from './Pages/Bai3_4';
import { TicTacToe } from './Components/TicTacToe/TicTacToe';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/bai1' element={<Bai1 />}/>
        <Route path='/bai2' element={<Bai2 />}/>
        <Route path='/bai3_4' element={<Bai3_4 />}/>
        <Route path='/tictactoe' element={<TicTacToe />}/>
      </Routes>
    </div>
  );
}

export default App;
