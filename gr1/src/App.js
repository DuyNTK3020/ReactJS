import "./App.css";
import { useState } from "react";

function App() {
    const storageStudents = JSON.parse(localStorage.getItem("students")) || [];

    const [student, setStudent] = useState({ name: "", id: "", dob: "", email: "" });
    const [students, setStudents] = useState(storageStudents);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Lấy giá trị từ các trường nhập liệu
        const name = event.target.name.value;
        const id = event.target.id.value;
        const dob = event.target.dob.value;
        const email = event.target.email.value;

        // Tạo một đối tượng mới đại diện cho sinh viên
        const newStudent = { name, id, dob, email };

        // Cập nhật danh sách sinh viên
        const updatedStudents = [...students, newStudent];
        setStudents(updatedStudents);

        // Lưu danh sách sinh viên vào localStorage
        localStorage.setItem("students", JSON.stringify(updatedStudents));

        // Reset form
        event.target.reset();
    };

    const handleDelete = (index) => {
        // Tạo một bản sao của danh sách sinh viên
        const updatedStudents = [...students];
        // Xóa sinh viên có index được chỉ định
        updatedStudents.splice(index, 1);
        // Cập nhật danh sách sinh viên
        setStudents(updatedStudents);
        // Lưu danh sách sinh viên vào localStorage
        localStorage.setItem("students", JSON.stringify(updatedStudents));
    };

    return (
        <div className="App" style={{ padding: 32 }}>
            <h1>Bài 1</h1>

            <form onSubmit={handleFormSubmit}>
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
                    {/* Thay đổi thành trường chọn ngày */}
                    <input type="date" id="dob" name="dob" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
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
    );
}

export default App;
