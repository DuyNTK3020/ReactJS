import { useState, useEffect } from "react";
import Content from "./Content";

// Note
// Cả trong 3 trường hợp useEffect(callback), useEffect(callback, []), useEffect(callback, [deps])
// Callback luôn luôn được gọi sau component mounted

function App() {
    const [show, setShow] = useState(false); 
    return (
        <div className="App" style={{ padding: 32 }}>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <Content />}
        </div>
    );
}

export default App;
