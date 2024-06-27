import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import './Bai6.scss';

export const Bai6 = () => {
  const storageData = JSON.parse(localStorage.getItem("chartData")) || [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
  ];

  const [data, setData] = useState(storageData);
  const [tempData, setTempData] = useState(storageData.map(item => ({ ...item })));  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...tempData];
    newData[index][field] = value;
    setTempData(newData);
  };

  const handleUpdate = () => {
    setData(tempData);
    localStorage.setItem("chartData", JSON.stringify(tempData));
  };

  return (
    <div className="Bai6">
      <h1>Bài 6: Vẽ biểu đồ</h1>
      <div className="container">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>X</th>
                <th>Y</th>
              </tr>
            </thead>
            <tbody>
              {tempData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="number"
                      value={row.x}
                      onChange={(e) =>
                        handleInputChange(index, "x", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.y}
                      onChange={(e) =>
                        handleInputChange(index, "y", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn" onClick={handleUpdate}>Cập nhật</button>
        </div>
        <div className="chart-container">
          <Bar
            options={options}
            data={{
              labels: data.map((item) => item.x),
              datasets: [
                {
                  label: "Biểu đồ cột",
                  data: data.map((item) => item.y),
                  backgroundColor: "#088178",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};
