const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bike_rental'
};

let db;
mysql.createConnection(dbConfig)
  .then(connection => {
    db = connection;
    console.log('Connected to the database');
  })
  .catch(err => console.error('Database connection failed:', err));

// Routes
// Create a new rental
app.post('/api/rentals', async (req, res) => {
  const { name, nic_number, rental_date, return_date, email, phone_number, driver_needed } = req.body;
  try {
    await db.query(
      'INSERT INTO rentals (name, nic_number, rental_date, return_date, email, phone_number, driver_needed) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, nic_number, rental_date, return_date, email, phone_number, driver_needed]
    );
    res.status(201).send('Rental created successfully');
  } catch (error) {
    res.status(500).send('Error creating rental: ' + error.message);
  }
});

// Retrieve all rentals
app.get('/api/rentals', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM rentals');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error retrieving rentals: ' + error.message);
  }
});

// Update a rental
app.put('/api/rentals/:id', async (req, res) => {
  const { id } = req.params;
  const { name, nic_number, rental_date, return_date, email, phone_number, driver_needed } = req.body;
  try {
    await db.query(
      'UPDATE rentals SET name=?, nic_number=?, rental_date=?, return_date=?, email=?, phone_number=?, driver_needed=? WHERE id=?',
      [name, nic_number, rental_date, return_date, email, phone_number, driver_needed, id]
    );
    res.send('Rental updated successfully');
  } catch (error) {
    res.status(500).send('Error updating rental: ' + error.message);
  }
});

// Delete a rental
app.delete('/api/rentals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM rentals WHERE id=?', [id]);
    res.send('Rental deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting rental: ' + error.message);
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
