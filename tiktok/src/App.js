import { useState } from "react";

const gifts = ["CPU i9", "RAM 32GB RGB", "RGB Keyboard"];

function App() {
  const [gift, setGift] = useState()

  const randomGift = () => {
    const index = Math.floor(Math.random() * gifts.length)
    setGift(gifts[index]);
  }

    return (
        <div className="App" style={{padding: 32}}>
            <h1>{gift || 'Chua co phan thuong'}</h1>
            <button onClick={randomGift}>Nhan thuong</button>
        </div>
    );
}

export default App;
