import React from "react";
import "./Admin.scss";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "No of user per year",
    },
  },
};

const labels = ["2020", "2021", "2022", "2023", "2024"];

export const bardata = {
  labels,
  datasets: [
    {
      label: "User",
      data: [10, 20, 50, 60, 70],
      backgroundColor: "rgba(75, 192, 192, 0.8 )",
    },
  ],
};

export const data = {
  labels: ["Approved", "Pending", "Rejected"],
  datasets: [
    {
      label: "Total Hostel",
      data: [22, 10, 5],
      backgroundColor: [
        "rgba(75, 192, 192, 0.5 )",
        "rgba(255, 206, 86, 0.5)",
        "rgba(255, 99, 132, 0.5)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(255, 99, 132, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};
export const Dashboard = () => {
  return (
    <div className="adminDashboard">
      <div className="adminWrapper">
        <div className="adminBox">
          <h3>Approved Hostel</h3>
          <h1>22</h1>
        </div>
        <div className="adminBox">
          <h3>Rejected Hostel</h3>
          <h1>22</h1>
        </div>
        <div className="adminBox">
          <h3>Total User</h3>
          <h1>80</h1>
        </div>
        <div className="adminBox">
          <h3>Total Amount</h3>
          <h1>10k</h1>
        </div>
      </div>
      <div className="chartWrapper">
        <div className="pieChart">
          <Pie data={data} />
        </div>
        <div className="pieChart">
          <Bar options={options} data={bardata} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
