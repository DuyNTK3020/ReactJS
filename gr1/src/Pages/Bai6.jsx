import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./Bai6.scss";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const Bai6 = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem('chartData');
        return savedData ? JSON.parse(savedData) : {
            labels: [],
            datasets: [
                {
                    label: "Dataset 1",
                    data: [],
                    backgroundColor: '#088178',
                },
            ],
        };
    });

    useEffect(() => {
        localStorage.setItem('chartData', JSON.stringify(data));
    }, [data]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newX = e.target.x.value;
        const newY = e.target.y.value;

        if (isNaN(newX) || isNaN(newY)) {
            toast.error("Vui lòng nhập giá trị hợp lệ cho X và Y", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        if (data.labels.includes(newX)) {
            Swal.fire({
                title: `X = ${newX} đã tồn tại`,
                text: "Bạn muốn cập nhật x và y",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Updated",
                        text: "Biểu đồ của bạn đã được cập nhật",
                        icon: "success"
                    });
                    data.datasets[0].data[data.labels.indexOf(newX)] = newY;
                    setData({ ...data });
                }
            });
        } else {
            setData({
                labels: [...data.labels, newX],
                datasets: [
                    {
                        label: "Dataset 1",
                        data: [...data.datasets[0].data, newY],
                        backgroundColor: '#088178',
                    },
                ],
            });

            toast.success(`Đã thêm thành công x = ${newX}, y =${newY} vào bảng`, {
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

    return (
        <div className="Bai6">
            <h1>Bài 6: Vẽ biểu đồ​</h1>
            <form onSubmit={handleFormSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="x">X</label>
                    <input type="number" id="x" name="x" required />
                </div>

                <div className="form-group">
                    <label htmlFor="y">Y</label>
                    <input type="number" id="y" name="y" required />
                </div>

                <div className="form-group form-btn">
                    <button className="btn" type="submit">
                        Thêm
                    </button>
                </div>
            </form>

            <div style={{ height: '490px' }}> {/* Set fixed height here */}
                <Bar options={options} data={data} />
            </div>
        </div>
    );
};

export default Bai6;
