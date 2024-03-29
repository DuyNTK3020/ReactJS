import React, { useState } from 'react'
import './Bai1.scss'

export const Bai1 = () => {
    const storageStudents = JSON.parse(localStorage.getItem("students")) || [];

    const [students, setStudents] = useState(storageStudents)

    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        const name = event.target.name.value
        const id = event.target.id.value
        const dob = event.target.dob.value
        const email = event.target.email.value

        const newStudents = {name, id, dob, email}

        const updatedStudents = [...students, newStudents]
        setStudents(updatedStudents)

        localStorage.setItem("students", JSON.stringify(updatedStudents));
        event.target.reset();
    }

    const handleDelete = (index) => {
        const updatedStudents = [...students];
        updatedStudents.splice(index, 1);
        setStudents(updatedStudents);
        localStorage.setItem("students", JSON.stringify(updatedStudents));
    }

  return (
    <div className="Bai1" style={{ padding: 32 }}>
            <h1>Bài 1: Thao tác với Data Table​ </h1>
            <form onSubmit={handleFormSubmit} className='form'>
                <div className="form-group">
                    <label htmlFor="name">Họ và tên</label>
                    <input type="text" id="name" name="name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="id">MSSV</label>
                    <input type="text" id="id" name="id" required />
                </div>

                <div className="form-group">
                    <label htmlFor="dob">Ngày sinh</label>
                    <input type="date" id="dob" name="dob" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group form-btn">
                    <button className="btn" type="submit">
                        Thêm
                    </button>
                </div>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>MSSV</th>
                        <th>Họ tên</th>
                        <th>Ngày sinh</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.dob}</td>
                            <td>{student.email}</td>
                            <td><button className="btn" onClick={() => handleDelete(index)}>Xóa</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}
