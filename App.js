import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BikeRental from './pages/BikeRental';
import RentalRecords from './pages/RentalRecords';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <h1>Bike Rental System</h1>
          <Link to="/">Bike Rental</Link>
          <Link to="/records">Rental Records</Link>
        </nav>

        <Routes>
          <Route path="/" element={<BikeRental />} />
          <Route path="/records" element={<RentalRecords />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
