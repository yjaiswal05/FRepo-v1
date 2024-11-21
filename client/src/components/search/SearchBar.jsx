import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Popper,
  ClickAwayListener,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { movieService } from '../../services/movieService';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    const searchMovies = async () => {
      if (debouncedQuery.length >= 2) {
        try {
          const searchResults = await movieService.getMovies({ 
            search: debouncedQuery,
            limit: 5 
          });
          setResults(searchResults);
        } catch (error) {
          console.error('Search failed:', error);
        }
      } else {
        setResults([]);
      }
    };

    searchMovies();
  }, [debouncedQuery]);

  const handleSearchInput = (event) => {
    setQuery(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setAnchorEl(null);
  };

  const handleMovieSelect = (movieId) => {
    navigate(`/movies/${movieId}`);
    handleClear();
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && results.length > 0;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
        <TextField
          fullWidth
          value={query}
          onChange={handleSearchInput}
          placeholder="Search movies..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          style={{ width: anchorEl?.offsetWidth, zIndex: 1300 }}
        >
          <Paper elevation={3}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {results.map((movie) => (
                <ListItem
                  key={movie.id}
                  button
                  onClick={() => handleMovieSelect(movie.id)}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      alt={movie.title}
                      src={movie.poster_url}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={movie.title}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {new Date(movie.release_date).getFullYear()}
                        </Typography>
                        {movie.overview && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {movie.overview}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar; 