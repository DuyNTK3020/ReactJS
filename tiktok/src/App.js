import { useState } from "react";

const courses = [
    {
        id: 1,
        name: "Javascript",
    },
    {
        id: 2,
        name: "ReactJS",
    },
    {
        id: 3,
        name: "NodeJS",
    },
];

function App() {
    const [checked, setChecked] = useState([]);
    const handleSubmit = () => {
        console.log({id : checked})
    };

    const handleCheck = (id) => {
      setChecked(prev => {
        const isChecked = checked.includes(id)
        if (isChecked) {
          return checked.filter(item => item != id)
        } else {
          return [...prev, id]
        }
      })
    }

    return (
        <div className="App" style={{ padding: 32 }}>
            {courses.map((course) => (
                <div key={course.id}>
                    <input
                        type="checkbox"
                        checked={checked.includes(course.id)}
                        onChange={() => handleCheck(course.id)}
                    />
                    {course.name}
                </div>
            ))}

            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default App;
