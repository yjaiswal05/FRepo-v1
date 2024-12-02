import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography,
  IconButton,
  Tooltip,
  tooltipClasses,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Popover,
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  Star,
  ChevronLeft,
  ChevronRight,
  Favorite,
  RemoveRedEye,
  BookmarkBorder,
  BookmarkAdded,
  FilterList,
  Clear,
} from '@mui/icons-material';
import axios from 'axios';

// Styled Components
const SectionContainer = styled(Box)({
  marginBottom: '40px',
});

const ScrollContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  '&:hover .scroll-button': {
    opacity: 1,
  },
});

const ScrollContent = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  gap: '16px',
  padding: '20px 40px',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
});

const MovieCard = styled(Box)({
  flex: '0 0 200px',
  width: '200px',
  backgroundColor: '#141414',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  }
});

const MovieInfo = styled(Box)({
  padding: '12px',
  backgroundColor: '#1a1a1a',
});

const MovieTitle = styled(Typography)({
  color: 'white',
  fontWeight: 500,
  fontSize: '0.9rem',
  marginBottom: '4px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

const MovieDetails = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '8px'
});

const ScrollButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  zIndex: 2,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  '&.left': {
    left: 0,
  },
  '&.right': {
    right: 0,
  }
});

const SectionTitle = styled(Typography)({
  color: 'white',
  fontWeight: 600,
  marginBottom: '16px',
  paddingLeft: '40px',
});

const MovieStats = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#989898',
  '& .MuiSvgIcon-root': {
    fontSize: '0.9rem',
  },
  '& .stat-group': {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }
});

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    color: '#fff',
    fontSize: '0.75rem',
    padding: '8px 12px',
    borderRadius: '4px',
    maxWidth: 'none'
  }
});

const IconWrapper = styled(Box)({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.2)',
  }
});

const IconsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px', // Space between icons
});

const TitleRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px'
});

const BookmarkIcon = styled(BookmarkBorder)({
  color: '#989898',
  fontSize: '1.2rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#ffffff',
    transform: 'scale(1.1)',
  }
});

// Styled Components for Filters
const FiltersContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '24px',
  paddingLeft: '40px',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  borderRadius: '8px',
  flexWrap: 'wrap'
});

const FilterButton = styled(Button)({
  color: 'white',
  borderColor: 'rgba(255, 255, 255, 0.23)',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  minWidth: '120px',
  justifyContent: 'space-between',
  padding: '8px 16px',
});

const FilterPopover = styled(Popover)({
  '& .MuiPopover-paper': {
    backgroundColor: '#1a1a1a',
    color: 'white',
    minWidth: '200px',
    maxWidth: '300px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
});

const FilterCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected'
})(({ selected }) => ({
  padding: '8px 16px',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'all 0.2s ease',
  backgroundColor: selected ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
  '&:hover': {
    backgroundColor: selected ? 'rgba(25, 118, 210, 0.2)' : 'rgba(255, 255, 255, 0.05)',
  },
}));

const ActiveFilters = styled(Box)({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  alignItems: 'center'
});

const FilterChip = styled(Box)({
  backgroundColor: 'rgba(25, 118, 210, 0.12)',
  color: '#fff',
  padding: '4px 12px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.2)',
  },
});

// Filter options
const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
];

const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

const ratings = [
  { value: '9', label: '9+ Rating' },
  { value: '8', label: '8+ Rating' },
  { value: '7', label: '7+ Rating' },
  { value: '6', label: '6+ Rating' },
];

const MovieFilters = ({ filters, setFilters }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);

  const handleFilterClick = (event, filterType) => {
    setAnchorEl(event.currentTarget);
    setCurrentFilter(filterType);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setAnchorEl(null);
  };

  const removeFilter = (type) => {
    setFilters(prev => ({
      ...prev,
      [type]: ''
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      genre: '',
      year: '',
      rating: ''
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FiltersContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
        <FilterButton
          variant="outlined"
          onClick={(e) => handleFilterClick(e, 'genre')}
          endIcon={<FilterList />}
        >
          {filters.genre || 'Genre'}
        </FilterButton>

        <FilterButton
          variant="outlined"
          onClick={(e) => handleFilterClick(e, 'year')}
          endIcon={<FilterList />}
        >
          {filters.year || 'Year'}
        </FilterButton>

        <FilterButton
          variant="outlined"
          onClick={(e) => handleFilterClick(e, 'rating')}
          endIcon={<FilterList />}
        >
          {filters.rating ? `${filters.rating}+ Rating` : 'Rating'}
        </FilterButton>

        {(filters.genre || filters.year || filters.rating) && (
          <IconButton 
            size="small" 
            onClick={clearAllFilters}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            <Clear />
          </IconButton>
        )}
      </Box>

      <FilterPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          {currentFilter === 'genre' && (
            <Grid container spacing={1}>
              {genres.map((genre) => (
                <Grid item xs={6} key={genre}>
                  <FilterCell
                    selected={filters.genre === genre}
                    onClick={() => handleFilterChange('genre', genre)}
                  >
                    {genre}
                  </FilterCell>
                </Grid>
              ))}
            </Grid>
          )}

          {currentFilter === 'year' && (
            <Grid container spacing={1}>
              {years.map((year) => (
                <Grid item xs={6} key={year}>
                  <FilterCell
                    selected={filters.year === year}
                    onClick={() => handleFilterChange('year', year)}
                  >
                    {year}
                  </FilterCell>
                </Grid>
              ))}
            </Grid>
          )}

          {currentFilter === 'rating' && (
            <RadioGroup
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
            >
              {ratings.map((rating) => (
                <FormControlLabel
                  key={rating.value}
                  value={rating.value}
                  control={<Radio sx={{ color: 'white' }} />}
                  label={rating.label}
                />
              ))}
            </RadioGroup>
          )}
        </Box>
      </FilterPopover>

      {(filters.genre || filters.year || filters.rating) && (
        <ActiveFilters>
          <FilterList sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
          {filters.genre && (
            <FilterChip
              component="div"
              onClick={() => removeFilter('genre')}
            >
              {filters.genre}
              <Clear sx={{ fontSize: 16, cursor: 'pointer' }} />
            </FilterChip>
          )}
          {filters.year && (
            <FilterChip
              component="div"
              onClick={() => removeFilter('year')}
            >
              {filters.year}
              <Clear sx={{ fontSize: 16, cursor: 'pointer' }} />
            </FilterChip>
          )}
          {filters.rating && (
            <FilterChip
              component="div"
              onClick={() => removeFilter('rating')}
            >
              {`${filters.rating}+ Rating`}
              <Clear sx={{ fontSize: 16, cursor: 'pointer' }} />
            </FilterChip>
          )}
        </ActiveFilters>
      )}
    </FiltersContainer>
  );
};

const Movies = () => {
  // State for each section
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [boxOfficeMovies, setBoxOfficeMovies] = useState([]);
  const [criticsChoice, setCriticsChoice] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topByGenre, setTopByGenre] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: ''
  });

  // Scroll handler for each section
  const handleScroll = (direction, containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 800; // Adjust scroll amount as needed
      container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  // Section component
  const MovieSection = ({ title, movies = [], sectionId }) => (
    <SectionContainer>
      <SectionTitle variant="h5">{title}</SectionTitle>
      <ScrollContainer>
        <ScrollButton 
          className="scroll-button left" 
          onClick={() => handleScroll('left', sectionId)}
        >
          <ChevronLeft />
        </ScrollButton>
        
        <ScrollContent id={sectionId}>
          {movies && movies.map((movie) => (
            <MovieCard key={movie?.id || Math.random()}>
              {/* Image Container */}
              <Box sx={{ height: '300px' }}>
                <img
                  src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
                  alt={movie?.title || 'Movie'}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              
              {/* Movie Information */}
              <MovieInfo>
                {/* Title and Bookmark Row */}
                <TitleRow>
                  <MovieTitle>{movie?.title || 'Loading...'}</MovieTitle>
                  <StyledTooltip 
                    title="Add to Watchlist"
                    placement="top"
                    arrow
                  >
                    <IconWrapper>
                      <BookmarkIcon />
                    </IconWrapper>
                  </StyledTooltip>
                </TitleRow>
                
                {/* Year and Icons Row */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 1
                }}>
                  <Typography 
                    variant="caption" 
                    sx={{ color: '#989898' }}
                  >
                    {movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </Typography>
                  
                  <IconsContainer>
                    <StyledTooltip 
                      title={`${((movie?.vote_count || 0) / 1000).toFixed(1)}k likes`}
                      placement="top"
                      arrow
                    >
                      <IconWrapper>
                        <Favorite sx={{ 
                          color: '#ff3d47',
                          fontSize: '0.9rem'
                        }} />
                      </IconWrapper>
                    </StyledTooltip>

                    <StyledTooltip 
                      title={`${((movie?.popularity || 0) / 1000).toFixed(1)}k views`}
                      placement="top"
                      arrow
                    >
                      <IconWrapper>
                        <RemoveRedEye sx={{ 
                          color: '#3498db',
                          fontSize: '0.9rem'
                        }} />
                      </IconWrapper>
                    </StyledTooltip>

                    <StyledTooltip 
                      title={`Rating: ${movie?.vote_average?.toFixed(1) || 'N/A'}`}
                      placement="top"
                      arrow
                    >
                      <IconWrapper>
                        <Star sx={{ 
                          color: '#ffd700',
                          fontSize: '0.9rem' 
                        }} />
                      </IconWrapper>
                    </StyledTooltip>
                  </IconsContainer>
                </Box>
              </MovieInfo>
            </MovieCard>
          ))}
        </ScrollContent>

        <ScrollButton 
          className="scroll-button right" 
          onClick={() => handleScroll('right', sectionId)}
        >
          <ChevronRight />
        </ScrollButton>
      </ScrollContainer>
    </SectionContainer>
  );

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        
        // Fetch movies for each section
        const [
          trendingRes,
          popularRes,
          boxOfficeRes,
          criticsRes,
          newReleasesRes,
          topGenreRes
        ] = await Promise.all([
          axios.get('http://localhost:5000/api/movies/trending'),
          axios.get('http://localhost:5000/api/movies/popular'),
          axios.get('http://localhost:5000/api/movies/boxoffice'),
          axios.get('http://localhost:5000/api/movies/critics'),
          axios.get('http://localhost:5000/api/movies/new'),
          axios.get('http://localhost:5000/api/movies/topgenre')
        ]);

        setTrendingMovies(trendingRes.data);
        setPopularMovies(popularRes.data);
        setBoxOfficeMovies(boxOfficeRes.data);
        setCriticsChoice(criticsRes.data);
        setNewReleases(newReleasesRes.data);
        setTopByGenre(topGenreRes.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: 'black',
      pt: 2
    }}>
      <Container maxWidth="xl">
        <MovieFilters filters={filters} setFilters={setFilters} />
        <MovieSection 
          title="Trending Now" 
          movies={trendingMovies} 
          sectionId="trending"
        />
        <MovieSection 
          title="Most Popular" 
          movies={popularMovies} 
          sectionId="popular"
        />
        <MovieSection 
          title="Box Office Hits" 
          movies={boxOfficeMovies} 
          sectionId="boxoffice"
        />
        <MovieSection 
          title="Critics' Choice" 
          movies={criticsChoice} 
          sectionId="critics"
        />
        <MovieSection 
          title="New Releases" 
          movies={newReleases} 
          sectionId="new"
        />
        <MovieSection 
          title="Top by Genre" 
          movies={topByGenre} 
          sectionId="genre"
        />
      </Container>
    </Box>
  );
};

export default Movies;
