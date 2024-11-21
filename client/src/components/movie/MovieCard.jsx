import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Rating,
} from '@mui/material';
import { Favorite, PlaylistAdd, Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component={Link}
        to={`/movies/${movie.id}`}
        sx={{
          height: 500,
          backgroundSize: 'cover',
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 },
        }}
        image={movie.poster_url}
        title={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(movie.release_date).getFullYear()}
        </Typography>
        <Rating value={movie.rating} precision={0.5} readOnly size="small" />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="add to watchlist">
          <PlaylistAdd />
        </IconButton>
        <IconButton aria-label="rate">
          <Star />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard; 