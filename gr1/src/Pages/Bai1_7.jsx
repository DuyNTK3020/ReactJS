import React, { useState } from 'react';
import './Bai1_7.scss';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from "react-toastify";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const Bai1_7 = () => {
    const storageStudents = JSON.parse(localStorage.getItem("students")) || [];

    const [students, setStudents] = useState(storageStudents);

    const handleFormSubmit = (event) => {
        // Ngăn chặn hành động mặc định của form submit
        event.preventDefault();
        
        // Lấy dữ liệu từ các input trong form
        const name = event.target.name.value;
        const id = event.target.id.value;
        const dob = event.target.dob.value;
        const email = event.target.email.value;

        // Kiểm tra xem sinh viên đã tồn tại hay chưa
        const checkStudent = students.find(student => student.id === id);

        if (!checkStudent) {
            // Nếu chưa tồn tại thì thêm vào danh sách sinh viên
            const newStudent = { name, id, dob, email };
            const updatedStudents = [...students, newStudent];
            setStudents(updatedStudents);
    
            localStorage.setItem("students", JSON.stringify(updatedStudents));
            event.target.reset();

            // Hiển thị thông báo thêm thành công sinh viên
            toast.success(`Đã thêm thành công sinh viên ${name}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            // Nếu đã tồn tại thì hiển thị thông báo lỗi
            toast.error(`MSSV: ${id} đã tồn tại. Vui lòng kiểm tra lại`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }
    };

    const handleDelete = (index) => {
        const updatedStudents = [...students];
        updatedStudents.splice(index, 1);
        setStudents(updatedStudents);
        localStorage.setItem("students", JSON.stringify(updatedStudents));
    };

    const exportToExcel = () => {
        const filteredStudents = students.map(({ name, id, dob, email }) => ({
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
    };

    const exportToPDF = () => {
        const documentDefinition = {
            content: [
                { text: 'Danh sách sinh viên', style: 'header' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', '*', 'auto', 'auto'],
                        body: [
                            ['STT', 'MSSV', 'Họ tên', 'Ngày sinh', 'Email'],
                            ...students.map((student, index) => [
                                index + 1,
                                student.id,
                                student.name,
                                student.dob,
                                student.email
                            ])
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    marginBottom: 10
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        };
        pdfMake.createPdf(documentDefinition).download('students.pdf');
    };

    return (
        <div className="Bai1">
            <h1>Bài 1, 7: Thao tác với Data Table và export data dạng excel và pdf</h1>
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
                    <input type="date" id="dob" name="dob" placeholder='dd/mm/yyyy' required />
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
            <ToastContainer />
        </div>
    );
};
