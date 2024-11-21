import React from 'react';
import { Box, CssBaseline, Container } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Container component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout; 