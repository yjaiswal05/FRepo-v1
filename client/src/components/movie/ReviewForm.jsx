import React, { useState } from 'react';
import {
  Box,
  TextField,
  Rating,
  Button,
  FormControlLabel,
  Switch,
  Alert,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { movieService } from '../../services/movieService';

const ReviewForm = ({ movieId }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    reviewText: '',
    containsSpoilers: false,
  });
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (reviewData) => movieService.createReview(movieId, reviewData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reviews', movieId]);
        setFormData({ rating: 0, reviewText: '', containsSpoilers: false });
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      setError('Please provide a rating');
      return;
    }
    mutate(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <Rating
          value={formData.rating}
          onChange={(_, value) => setFormData({ ...formData, rating: value })}
          size="large"
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Write your review"
        value={formData.reviewText}
        onChange={(e) =>
          setFormData({ ...formData, reviewText: e.target.value })
        }
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={formData.containsSpoilers}
            onChange={(e) =>
              setFormData({ ...formData, containsSpoilers: e.target.checked })
            }
          />
        }
        label="Contains spoilers"
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </Box>
  );
};

export default ReviewForm; 