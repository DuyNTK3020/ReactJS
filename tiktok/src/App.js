import { useState } from "react";

const jobs = [
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
    const storageJobs = JSON.parse(localStorage.getItem('jobs'))

    const [job, setJob] = useState("");
    const [jobs, setJobs] = useState(storageJobs ?? []);

    const handleSubmit = () => {
        setJobs(prev => {
          const newJobs = [...prev, job]
          
          const jsonJobs = JSON.stringify(newJobs)
          localStorage.setItem('jobs', jsonJobs)

          return newJobs
        });
        setJob('')
    };

    return (
        <div className="App" style={{ padding: 32 }}>
            <input value={job} onChange={(e) => setJob(e.target.value)} />
            <button onClick={handleSubmit}>Add</button>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>{job}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
