import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import './Navbar.scss'

export const Navbar = () => {
    const [menu, setMenu] = useState("");


  return (
    <div className='nav'>
        <div className="nav__home">
          <Link onClick={() => {setMenu("")}} to='/'><FontAwesomeIcon icon={faHouseChimney} /></Link>
        </div>
        <ul className="nav__menu">
            <li><Link className={menu === "bai1_7" ? "active" : ""} onClick={() => {setMenu("bai1_7")}} to ='/bai1_7'>Bài 1 và 7</Link></li>
            <li><Link className={menu === "bai2" ? "active" : ""} onClick={() => {setMenu("bai2")}} to ='/bai2'>Bài 2</Link></li>
            <li><Link className={menu === "bai3_4" ? "active" : ""} onClick={() => {setMenu("bai3_4")}} to ='/bai3_4'>Bài 3 và 4</Link></li>
            <li><Link className={menu === "bai5" ? "active" : ""} onClick={() => {setMenu("bai5")}} to ='/bai5'>Bài 5</Link></li>
            <li><Link className={menu === "bai6" ? "active" : ""} onClick={() => {setMenu("bai6")}} to ='/bai6'>Bài 6</Link></li>
            {/* <li><Link className={menu === "tictactoe" ? "active" : ""} onClick={() => {setMenu("tictactoe")}} to ='/tictactoe'>TicTacToe</Link></li> */}
        </ul>
    </div>
  )
}
