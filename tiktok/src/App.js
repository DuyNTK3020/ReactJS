import { useState } from "react";

function App() {

  const orders = [100, 200 ,300]

    const [counter, setCounter] = useState(() => {
      const total = orders.reduce((total, cur) => total + cur)
      return total;
    });

    const handleIncrease = () => {
      setCounter(prevState => prevState + 1);
      setCounter(prevState => prevState + 1);
      setCounter(prevState => prevState + 1);

      // setCounter(prevState + 1);
      // setCounter(prevState + 1);
      // setCounter(prevState + 1);
    }

    return (
        <div className="App">
            <h1>{counter}</h1>
            <button onClick = {handleIncrease}>Increase</button>
        </div>
    );
}

export default App;
