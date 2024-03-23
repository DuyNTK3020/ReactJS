import { useState } from "react";

function App() {

  const orders = [100, 200 ,300]

    const [info, setInfo] = useState({
      name: 'Nguyen Van A',
      age: 18,
      address: 'Ha Noi, VN'
    });

    const handleUpdate = () => {
      setInfo({
        ...info,
        bio: 'HIHI'
      });
    }

    return (
        <div className="App">
            <h1>{JSON.stringify(info)}</h1>
            <button onClick = {handleUpdate}>Update</button>
        </div>
    );
}

export default App;
