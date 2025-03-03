import React, { useState } from "react";
import { CSVLink } from "react-csv";
import "./index.css"; // Importing the CSS file

const API_URL = "https://ui-feedback.onrender.com/api/users"; // API Link

function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setData(result.data);
      } else {
        setError("Invalid data format received.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
    }
    setLoading(false);
  };

  // Convert data to CSV format
  const csvHeaders = [
    { label: "Email", key: "email" },
    { label: "Created At", key: "createdAt" },
  ];

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {/* Buttons */}
      <div className="buttons">
        <button onClick={fetchData} className="view-button">
          View Data
        </button>

        {data.length > 0 && (
          <CSVLink
            data={data}
            headers={csvHeaders}
            filename="exported_data.csv"
            className="export-button"
          >
            Export Data
          </CSVLink>
        )}
      </div>

      {/* Display Loading/Error */}
      {loading && <p>Loading data...</p>}
      {error && <p className="error">{error}</p>}

      {/* Data Table */}
      {data.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
