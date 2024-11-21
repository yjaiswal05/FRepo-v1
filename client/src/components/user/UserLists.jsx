import React from 'react';
import { useQuery } from 'react-query';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { Edit, Delete, Lock } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { listService } from '../../services/listService';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const UserLists = ({ userId }) => {
  const { user: currentUser } = useAuth();
  const { data: lists, isLoading } = useQuery(['userLists', userId], () =>
    listService.getUserLists(userId)
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <Grid container spacing={3}>
      {lists.map((list) => (
        <Grid item xs={12} sm={6} md={4} key={list.id}>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component={Link}
                to={`/lists/${list.id}`}
                sx={{
                  height: 200,
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 },
                }}
                image={list.movies?.[0]?.poster_url || '/default-list-cover.jpg'}
              />
              {list.is_private && (
                <Lock
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'white',
                  }}
                />
              )}
            </Box>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Typography variant="h6" component={Link} to={`/lists/${list.id}`}>
                  {list.title}
                </Typography>
                {currentUser?.id === userId && (
                  <Box>
                    <IconButton
                      size="small"
                      component={Link}
                      to={`/lists/${list.id}/edit`}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {list.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={`${list.movies?.length || 0} movies`}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={list.is_private ? 'Private' : 'Public'}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserLists; 