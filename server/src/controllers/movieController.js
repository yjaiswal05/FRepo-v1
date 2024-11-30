import axios from 'axios';
import { MovieService } from '../services/movieService.js';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export class MovieController {
    constructor() {
        this.movieService = new MovieService();
    }

    // Helper method for TMDB API calls
    async fetchFromTMDB(endpoint, params = {}) {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    ...params
                }
            });
            return response.data.results;
        } catch (error) {
            console.error('TMDB API Error:', error);
            throw error;
        }
    }

    // Get Trending Movies
    getTrendingMovies = async (req, res) => {
        try {
            const movies = await this.fetchFromTMDB('/trending/movie/week');
            res.json(movies.slice(0, 10)); // Limit to 10 movies
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching trending movies',
                error: error.message 
            });
        }
    }

    // Get Popular Movies
    getPopularMovies = async (req, res) => {
        try {
            const movies = await this.fetchFromTMDB('/movie/popular');
            res.json(movies.slice(0, 10));
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching popular movies',
                error: error.message 
            });
        }
    }

    // Get Box Office Hits (Top Rated)
    getBoxOfficeMovies = async (req, res) => {
        try {
            const movies = await this.fetchFromTMDB('/movie/top_rated', {
                'vote_count.gte': 1000 // Ensure significant number of votes
            });
            res.json(movies.slice(0, 10));
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching box office movies',
                error: error.message 
            });
        }
    }

    // Get Critics Choice
    getCriticsChoice = async (req, res) => {
        try {
            const movies = await this.fetchFromTMDB('/discover/movie', {
                'vote_average.gte': 7.5,
                'vote_count.gte': 100,
                sort_by: 'vote_average.desc'
            });
            res.json(movies.slice(0, 10));
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching critics choice movies',
                error: error.message 
            });
        }
    }

    // Get New Releases
    getNewReleases = async (req, res) => {
        try {
            const movies = await this.fetchFromTMDB('/movie/now_playing', {
                region: 'US' // Adjust region as needed
            });
            res.json(movies.slice(0, 10));
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching new releases',
                error: error.message 
            });
        }
    }

    // Get Top by Genre
    getTopByGenre = async (req, res) => {
        try {
            const { genre_id = 28 } = req.query; // Default to Action genre
            const movies = await this.fetchFromTMDB('/discover/movie', {
                with_genres: genre_id,
                sort_by: 'popularity.desc'
            });
            res.json(movies.slice(0, 10));
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching genre movies',
                error: error.message 
            });
        }
    }

    // Keep existing methods
    getMovies = async (req, res) => {
        try {
            // For now, return some sample data
            const movies = [
                {
                    id: 1,
                    title: "Oppenheimer",
                    poster_path: "/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
                    vote_average: 8.2,
                    release_date: "2023-07-19"
                  },
                  {
                    id: 2,
                    title: "Barbie",
                    poster_path: "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
                    vote_average: 7.8,
                    release_date: "2023-07-19"
                  },
                  {
                    id: 3,
                    title: "Anyone But You",
                    poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
                    vote_average: 7.4,
                    release_date: "2023-12-21"
                  },
                  {
                    id: 4,
                    title: "Wonka",
                    poster_path: "/A7SobaUTvb6d6gFCXyID8bQmd8i.jpg",
                    vote_average: 7.2,
                    release_date: "2023-12-06"
                  },
                  {
                    id: 5,
                    title: "Aquaman",
                    poster_path: "/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg",
                    vote_average: 6.9,
                    release_date: "2023-12-20"
                  },
                  {
                    id: 6,
                    title: "Migration",
                    poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
                    vote_average: 7.6,
                    release_date: "2023-12-06"
                  },
                  {
                    id: 7,
                    title: "Mean Girls",
                    poster_path: "/jXJxMcVoEuXzql3lXPi8jqAQwR4.jpg",
                    vote_average: 6.9,
                    release_date: "2024-01-10"
                  },
                  {
                    id: 8,
                    title: "Poor Things",
                    poster_path: "/cGXFosYUHYjjdKrOmA0bbjvzhKz.jpg",
                    vote_average: 8.1,
                    release_date: "2023-12-07"
                  },
                  {
                    id: 9,
                    title: "Madame Web",
                    poster_path: "/mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg",
                    vote_average: 5.3,
                    release_date: "2024-02-14"
                  },
                  {
                    id: 10,
                    title: "The Beekeeper",
                    poster_path: "/A7JQ7MIV5fkIxceI5hizRIe6DRJ.jpg",
                    vote_average: 7.4,
                    release_date: "2024-01-10"
                  },
                  {
                    id: 11,
                    title: "Napoleon",
                    poster_path: "/jE5o7y9K6pZtWNNMEw3IdpHuncR.jpg",
                    vote_average: 6.5,
                    release_date: "2023-11-22"
                  },
                  {
                    id: 12,
                    title: "Argylle",
                    poster_path: "/95VlSEfLMqeX36UVcHJuNlWEpwf.jpg",
                    vote_average: 6.1,
                    release_date: "2024-01-31"
                  }
                ];
            res.json(movies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    toggleFavorite = async (req, res) => {
        try {
            const { id } = req.params;
            // Add your favorite toggle logic here
            res.json({ message: `Toggled favorite for movie ${id}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    toggleWatchlist = async (req, res) => {
        try {
            const { id } = req.params;
            // Add your watchlist toggle logic here
            res.json({ message: `Toggled watchlist for movie ${id}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
} 