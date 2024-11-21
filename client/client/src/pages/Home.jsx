import React from 'react';
import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to FilmSocial
      </Typography>
      <Typography variant="body1">
        Your place to discover, review, and discuss movies with fellow film enthusiasts.
      </Typography>
    </Box>
  );
};

export default Home; 