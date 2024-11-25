import React from 'react';
import { Box } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {children}
    </Box>
  );
};

export default MainLayout; 