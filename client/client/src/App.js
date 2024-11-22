import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/layout/Navbar';
import './App.css';
import Home from './pages/Home';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a1a1a',     // Almost black
      dark: '#000000',     // Pure black
      light: '#2c2c2c',    // Lighter shade for
    },
    secondary: {
      main: '#b71c1c', // Deep red accent
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <main style={{ marginTop: '80px', padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<h2>Movies Page (Coming Soon)</h2>} />
              <Route path="/login" element={<h2>Login Page (Coming Soon)</h2>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
