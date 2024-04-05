import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Index } from './Pages/Index';
import { Bai1_7 } from './Pages/Bai1_7';
import { Bai2 } from './Pages/Bai2';
import { Bai3_4 } from './Pages/Bai3_4';
import { Bai5 } from './Pages/Bai5';
import { Bai6 } from './Pages/Bai6';
import { TicTacToe } from './Components/TicTacToe/TicTacToe';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/bai1_7' element={<Bai1_7 />}/>
        <Route path='/bai2' element={<Bai2 />}/>
        <Route path='/bai3_4' element={<Bai3_4 />}/>
        <Route path='/bai5' element={<Bai5 />}/>
        <Route path='/bai6' element={<Bai6 />}/>
        <Route path='/tictactoe' element={<TicTacToe />}/>
      </Routes>
    </div>
  );
}

export default App;
