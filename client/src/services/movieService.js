import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const movieService = {
  async getMovies(params) {
    const response = await axios.get(`${API_URL}/movies`, { params });
    return response.data;
  },

  async getMovie(id) {
    const response = await axios.get(`${API_URL}/movies/${id}`);
    return response.data;
  },

  async getMovieReviews(movieId, params) {
    const response = await axios.get(`${API_URL}/movies/${movieId}/reviews`, { params });
    return response.data;
  },

  async createReview(movieId, reviewData) {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/movies/${movieId}/reviews`,
      reviewData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  },

  async updateReview(reviewId, reviewData) {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/movies/reviews/${reviewId}`,
      reviewData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  },

  async deleteReview(reviewId) {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/movies/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}; 