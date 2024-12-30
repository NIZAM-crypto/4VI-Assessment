import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RentalRecords = () => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    nic_number: '',
    rental_date: '',
    return_date: '',
    email: '',
    phone_number: '',
    driver_needed: 'No'
  });

  // Fetch all records
  useEffect(() => {
    axios.get('http://localhost:5000/api/rentals')
      .then((response) => setRecords(response.data))
      .catch(() => alert('Failed to fetch records'));
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/rentals/${id}`)
      .then(() => setRecords(records.filter(record => record.id !== id)))
      .catch(() => alert('Failed to delete record'));
  };

  // Start editing
  const handleEdit = (record) => {
    setEditingRecord(record.id);
    setEditFormData(record);
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Submit updated record
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/rentals/${editingRecord}`, editFormData)
      .then(() => {
        setRecords(records.map(record => (record.id === editingRecord ? { ...record, ...editFormData } : record)));
        setEditingRecord(null); // Exit edit mode
      })
      .catch(() => alert('Failed to update record'));
  };

  return (
    <div>
      <h2>Rental Records</h2>
      <style>
        {`
          /* Table styling */
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            border: 2px solid #4CAF50;
          }

          th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
          }

          th {
            background-color: #4CAF50;
            color: white;
          }

          td {
            background-color: #fff;
          }

          /* Button styling */
          button {
            padding: 8px 16px;
            margin: 5px;
            cursor: pointer;
            border: none;
            color: #fff;
            background-color: #4CAF50;
            border-radius: 4px;
          }

          button:hover {
            background-color: #45a049;
          }

          button:active {
            transform: scale(0.98);
          }

          /* Form styling */
          form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          input, select {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 100%;
          }

          button[type="submit"], button[type="button"] {
            grid-column: span 2;
          }

          input[type="text"], input[type="email"], input[type="date"], select {
            font-size: 14px;
          }

          /* Responsive styles */
          @media (max-width: 768px) {
            table {
              font-size: 12px;
            }

            form {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      {editingRecord ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditChange}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="nic_number"
            value={editFormData.nic_number}
            onChange={handleEditChange}
            placeholder="NIC Number"
            required
          />
          <input
            type="date"
            name="rental_date"
            value={editFormData.rental_date}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="return_date"
            value={editFormData.return_date}
            onChange={handleEditChange}
            required
          />
          <input
            type="email"
            name="email"
            value={editFormData.email}
            onChange={handleEditChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone_number"
            value={editFormData.phone_number}
            onChange={handleEditChange}
            placeholder="Phone Number"
            required
          />
          <select
            name="driver_needed"
            value={editFormData.driver_needed}
            onChange={handleEditChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingRecord(null)}>Cancel</button>
        </form>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>NIC</th>
              <th>Rental Date</th>
              <th>Return Date</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Driver Needed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.name}</td>
                <td>{record.nic_number}</td>
                <td>{record.rental_date}</td>
                <td>{record.return_date}</td>
                <td>{record.email}</td>
                <td>{record.phone_number}</td>
                <td>{record.driver_needed}</td>
                <td>
                  <button onClick={() => handleEdit(record)}>Edit</button>
                  <button onClick={() => handleDelete(record.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RentalRecords;
