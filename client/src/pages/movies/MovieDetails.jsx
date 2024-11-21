import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Box,
  Typography,
  Grid,
  Rating,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import { PlaylistAdd, Favorite } from '@mui/icons-material';
import { movieService } from '../../services/movieService';
import ReviewList from '../../components/movie/ReviewList';
import ReviewForm from '../../components/movie/ReviewForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MovieDetails = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useQuery(['movie', id], () => 
    movieService.getMovie(id)
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box>
      {/* Backdrop Image */}
      <Box
        sx={{
          height: '400px',
          backgroundImage: `url(${movie.backdrop_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          mb: 4,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            p: 4,
            color: 'white',
          }}
        >
          <Typography variant="h3">{movie.title}</Typography>
          <Typography variant="h6">
            {new Date(movie.release_date).getFullYear()}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={3}>
          <img
            src={movie.poster_url}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PlaylistAdd />}
              sx={{ mb: 1 }}
            >
              Add to List
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Favorite />}
            >
              Add to Favorites
            </Button>
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography>{movie.overview}</Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Reviews Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Reviews
            </Typography>
            <ReviewForm movieId={id} />
            <ReviewList movieId={id} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetails; 