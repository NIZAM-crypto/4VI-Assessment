import React, { useState } from 'react';
import axios from 'axios';

const BikeRental = () => {
  const [formData, setFormData] = useState({
    name: '',
    nic_number: '',
    rental_date: '',
    return_date: '',
    email: '',
    phone_number: '',
    driver_needed: 'No'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.nic_number || !formData.rental_date || !formData.return_date || !formData.email || !formData.phone_number) {
      setError('All fields are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email format');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone_number)) {
      setError('Phone number must be 10 digits');
      return;
    }

    axios.post('http://localhost:5000/api/rentals', formData)
      .then(() => {
        setError('');
        alert('Rental record created successfully');
        setFormData({
          name: '',
          nic_number: '',
          rental_date: '',
          return_date: '',
          email: '',
          phone_number: '',
          driver_needed: 'No'
        });
      })
      .catch(() => setError('Error saving rental'));
  };

  return (
    <div className="rental-form-container">
      <h2>Bike Rental Form</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>NIC Number:</label>
        <input type="text" name="nic_number" value={formData.nic_number} onChange={handleChange} />

        <label>Rental Date:</label>
        <input type="date" name="rental_date" value={formData.rental_date} onChange={handleChange} />

        <label>Return Date:</label>
        <input type="date" name="return_date" value={formData.return_date} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Phone Number:</label>
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />

        <label>Driver Needed:</label>
        <select name="driver_needed" value={formData.driver_needed} onChange={handleChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      <style>
        {`
          .rental-form-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          h2 {
            text-align: center;
            color: #333;
          }

          form {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
          }

          label {
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }

          input, select {
            padding: 10px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 100%;
          }

          button {
            padding: 10px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          button:hover {
            background-color: #45a049;
          }

          .error-message {
            color: red;
            font-size: 14px;
            text-align: center;
            margin-bottom: 15px;
          }

          @media (max-width: 768px) {
            .rental-form-container {
              padding: 15px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BikeRental;
