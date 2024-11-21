import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Grid,
  Typography,
  Box,
  Pagination,
  CircularProgress,
} from '@mui/material';
import MovieCard from '../../components/movie/MovieCard';
import { movieService } from '../../services/movieService';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;

  const { data, isLoading } = useQuery(
    ['movieSearch', query, page],
    () => movieService.getMovies({ search: query, page, limit }),
    { enabled: !!query }
  );

  const handlePageChange = (event, newPage) => {
    setSearchParams({ q: query, page: newPage.toString() });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Search Results for "{query}"
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        Found {data?.total || 0} results
      </Typography>

      <Grid container spacing={3} sx={{ my: 2 }}>
        {data?.movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {data?.total > limit && (
        <Box display="flex" justifyContent="center" my={4}>
          <Pagination
            count={Math.ceil(data.total / limit)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchResults; 