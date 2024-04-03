import React, { useState } from 'react';
import './Bai1_7.scss';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export const Bai1_7 = () => {
    const storageStudents = JSON.parse(localStorage.getItem("students")) || [];

    // Load font
    const font = {
        family: 'Open Sans',
        style: 'normal'
    };

    // Add font to jsPDF
    const doc = new jsPDF();
    doc.addFont(font.family, 'OpenSans', font.style);
    doc.setFont('OpenSans');

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

    // const exportToExcel = () => {
    //     const wb = XLSX.utils.table_to_book(document.getElementById('my-table'));
    //     XLSX.writeFile(wb, 'students.xlsx');
    // }
    
    const exportToExcel = () => {
        const filteredStudents = students.map(({name, id, dob, email}) => ({
            "Họ Tên": name,
            "MSSV": id,
            "Ngày sinh": dob,
            "Email": email,
            "Địa chỉ": ""
        }));
        
        const ws = XLSX.utils.json_to_sheet(filteredStudents);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
        XLSX.writeFile(wb, 'students.xlsx');
    }

    const exportToPDF = () => {
        const doc = new jsPDF();
    
        // Set the title
        doc.text("Danh sách sinh viên", 10, 10);
    
        // Define column headers
        const headers = ['STT', 'MSSV', 'Họ tên', 'Ngày sinh', 'Email'];
        
        // Define rows data
        const rows = students.map((student, index) => [
            index + 1,
            student.id,
            student.name,
            student.dob,
            student.email
        ]);
    
        // AutoTable plugin to generate table
        doc.autoTable({
            head: [headers],
            body: rows
        });
    
        // Save the PDF
        doc.save("students.pdf");
    };
     

    return (
        <div className="Bai1" style={{ padding: 32 }}>
            <h1>Bài 1: Thao tác với Data Table</h1>
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

            <table id='my-table'>
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

            <div className="export">
                <p className='export--title'>Export:</p>
                <button className='btn' onClick={exportToExcel}>Excel</button>
                <button className="btn" onClick={exportToPDF}>PDF</button>
            </div>
        </div>
    )
}
