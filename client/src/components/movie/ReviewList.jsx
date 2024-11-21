import React from 'react';
import { useQuery } from 'react-query';
import {
  List,
  ListItem,
  Avatar,
  Box,
  Typography,
  Rating,
  Divider,
} from '@mui/material';
import { movieService } from '../../services/movieService';
import { formatDistanceToNow } from 'date-fns';

const ReviewList = ({ movieId }) => {
  const { data: reviews, isLoading } = useQuery(['reviews', movieId], () =>
    movieService.getMovieReviews(movieId)
  );

  if (isLoading) return null;

  return (
    <List>
      {reviews.map((review) => (
        <React.Fragment key={review.id}>
          <ListItem alignItems="flex-start" sx={{ px: 0 }}>
            <Avatar
              src={review.user.profile_picture_url}
              alt={review.user.username}
              sx={{ mr: 2 }}
            />
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1">
                  {review.user.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(review.created_at), {
                    addSuffix: true,
                  })}
                </Typography>
              </Box>
              <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
              <Typography variant="body1">{review.review_text}</Typography>
            </Box>
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default ReviewList; 