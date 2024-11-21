import React from 'react';
import { useQuery } from 'react-query';
import { Box, Typography, Grid } from '@mui/material';
import { userService } from '../../services/userService';

const UserStats = ({ userId }) => {
  const { data: stats } = useQuery(['userStats', userId], () =>
    userService.getUserStats(userId)
  );

  const statItems = [
    { label: 'Films', value: stats?.totalFilms || 0 },
    { label: 'Lists', value: stats?.totalLists || 0 },
    { label: 'Reviews', value: stats?.totalReviews || 0 },
    { label: 'Followers', value: stats?.followers || 0 },
    { label: 'Following', value: stats?.following || 0 },
  ];

  return (
    <Grid container spacing={3}>
      {statItems.map((item) => (
        <Grid item xs={4} sm={2} key={item.label}>
          <Box textAlign="center">
            <Typography variant="h6">{item.value}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserStats; 