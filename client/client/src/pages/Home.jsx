import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Sample movie data with posters
const sampleMovies = [
  {
    id: 1,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg"
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg"
  },
  {
    id: 5,
    title: "The Godfather",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  },
  {
    id: 6,
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
  }
];

// At the top of the file, add these background images
const heroBackgrounds = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3'
];

const Home = () => {
  const theme = useTheme();

  const randomBackground = heroBackgrounds[Math.floor(Math.random() * heroBackgrounds.length)];

  return (
    <Box sx={{ pb: 6 }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '90vh',
          width: '100vw',
          position: 'relative',
          mb: 6,
          background: `linear-gradient(to right, 
            rgba(0,0,0,1) 0%, 
            rgba(0,0,0,0.8) 10%, 
            rgba(0,0,0,0.6) 25%, 
            rgba(0,0,0,0.6) 75%, 
            rgba(0,0,0,0.8) 90%, 
            rgba(0,0,0,1) 100%),
            linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), 
            url('${randomBackground}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '-100px',
          marginLeft: '-24px',  // Compensate for any default page padding
          marginRight: '-24px', // Compensate for any default page padding
          paddingTop: '64px',
        }}
      >
        <Container 
          sx={{ 
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 2,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            }}
          >
            Your Ultimate Movie Journal, Redefined
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              mb: 3,
              maxWidth: '800px',
              opacity: 0.9,
            }}
          >
            Discover. Review. Connect. All Things Cinema, in One Place.
          </Typography>
          
          {/* CTA Button */}
          <Button
            variant="outlined"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.7)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '1rem',
              textTransform: 'none',
              transition: 'transform 0.3s, background-color 0.3s',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: '#ff3d47',
                color: '#ff3d47',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
              },
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              mt: 3,
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      {/* Movie Cards Section */}
      <Container>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Popular Now
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              pb: 2,
              '&::-webkit-scrollbar': {
                height: 8,
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.background.paper,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 4,
              },
            }}
          >
            {sampleMovies.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  minWidth: 200,
                  height: 300,
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    cursor: 'pointer',
                    '& .movie-info': {
                      opacity: 1,
                    }
                  },
                }}
              >
                {/* Movie Poster */}
                <Box
                  component="img"
                  src={movie.poster}
                  alt={movie.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Hover Overlay */}
                <Box
                  className="movie-info"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 2,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: 'white' }}>
                    {movie.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Recent Reviews Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Recent Reviews
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 3,
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <Box
                key={item}
                sx={{
                  height: 200,
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 1,
                  p: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;