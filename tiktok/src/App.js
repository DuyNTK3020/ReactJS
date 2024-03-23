import { useState } from "react";

function App() {
    const [name, setName] = useState();
    const [mail, setMail] = useState();

    const handleSubmit = () => {
      setName("Nguyen Van B")
      setMail("bnv@gmail.com")
    }

    return (
        <div className="App" style={{ padding: 32 }}>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input value={mail} onChange={(e) => setMail(e.target.value)} />
            <button onClick={handleSubmit}>Change</button>
        </div>
    );
}

export default App;
