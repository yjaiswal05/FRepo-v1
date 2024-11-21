import React from 'react';
import { useQuery } from 'react-query';
import {
  List,
  ListItem,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { movieService } from '../../services/movieService';
import LoadingSpinner from '../common/LoadingSpinner';

const UserReviews = ({ userId }) => {
  const { data: reviews, isLoading } = useQuery(['userReviews', userId], () =>
    movieService.getUserReviews(userId)
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <List>
      {reviews.map((review) => (
        <ListItem key={review.id} sx={{ px: 0 }}>
          <Card sx={{ display: 'flex', width: '100%' }}>
            <CardMedia
              component={Link}
              to={`/movies/${review.movie.id}`}
              sx={{
                width: 140,
                backgroundSize: 'cover',
              }}
              image={review.movie.poster_url}
              title={review.movie.title}
            />
            <CardContent sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/movies/${review.movie.id}`}
                >
                  {review.movie.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(review.created_at), {
                    addSuffix: true,
                  })}
                </Typography>
              </Box>
              <Rating value={review.rating} readOnly size="small" sx={{ my: 1 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {review.review_text}
              </Typography>
              {review.contains_spoilers && (
                <Chip
                  label="Contains Spoilers"
                  size="small"
                  color="warning"
                  sx={{ mt: 1 }}
                />
              )}
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default UserReviews; 