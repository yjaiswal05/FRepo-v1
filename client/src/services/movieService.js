import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const movieService = {
  async getMovies({ page = 1, genres = [], year = [], rating = [], platform = 'all', sort = 'popularity.desc' }) {
    try {
      const response = await axios.get(`${BASE_URL}/movies`, {
        params: {
          page,
          genres: genres.join(','),
          year_start: year[0],
          year_end: year[1],
          rating_start: rating[0],
          rating_end: rating[1],
          platform,
          sort
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  async toggleFavorite(movieId) {
    try {
      const response = await axios.post(`${BASE_URL}/movies/${movieId}/favorite`);
      return response.data;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  },

  async toggleWatchlist(movieId) {
    try {
      const response = await axios.post(`${BASE_URL}/movies/${movieId}/watchlist`);
      return response.data;
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      throw error;
    }
  }
}; 