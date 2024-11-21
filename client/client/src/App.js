import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={
              <>
                <h1>Welcome to FilmSocial</h1>
                <p>Your place to discover, review, and discuss movies with fellow film enthusiasts.</p>
              </>
            } />
            <Route path="/movies" element={<h2>Movies Page (Coming Soon)</h2>} />
            <Route path="/login" element={<h2>Login Page (Coming Soon)</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
