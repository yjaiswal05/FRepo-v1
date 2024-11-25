import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { ThumbUp, List, Movie, Visibility } from '@mui/icons-material';

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

// Styled component for the glassmorphic effect
const GlassmorphicBar = styled(Box)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(15px)',
  borderRadius: '15px',
  padding: '15px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  marginTop: '30px',
});

const IconWrapper = styled('div')({
  display: 'inline-block',
  margin: '0 15px',
  width: '45px',
  height: '45px',
  transition: 'transform 0.3s, filter 0.3s',
  '&:hover': {
    transform: 'scale(1.1) translateY(-5px)', // Added translateY for a floating effect
    filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.5))', // Enhanced glow effect
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'all 0.3s ease',
  }
});

// New section for vertical metrics
const VerticalMetricsSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around', // Space out the metrics evenly
  marginTop: '60px', // Space above the vertical metrics section
  padding: '10px 0', // Padding for the section
});

const VerticalMetric = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%', // Width for each metric
  borderLeft: '1px solid rgba(255, 255, 255, 0.2)', // Left border for separation
  justifyContent: 'space-between',
  padding: '10px', // Padding for each metric
  textAlign: 'center', // Center align text
  '&:first-of-type': {
    borderLeft: 'none', // Remove left border for the first metric
    
  },
});

// Add this styled component near your other styled components
const AnimatedIcon = styled('div')({
  display: 'inline-block',
  transition: 'transform 0.3s ease',
  animation: 'floatIcon 3s ease-in-out infinite',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
  },
  '@keyframes floatIcon': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
});

// Add a styled component for the icons container
const IconsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '15px',
});

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
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), 
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

          {/* Glassmorphic Bar with Text and Icons */}
          <GlassmorphicBar>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                textAlign: 'center',
                fontWeight: '500',
                letterSpacing: '0.5px',
                opacity: '0.9',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontSize: '1.1rem',
              }}
            >
              Your Gateway to 25+ Streaming Platforms
            </Typography>
            
            <IconsContainer>
              <IconWrapper>
                <img 
                  src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png" 
                  alt="Netflix" 
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </IconWrapper>
              <IconWrapper>
                <img 
                  src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/92/amazon-prime-logo-256.png" 
                  alt="Prime Video" 
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </IconWrapper>
              <IconWrapper>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/2560px-Disney%2B_logo.svg.png" 
                  alt="Disney+" 
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </IconWrapper>
              <IconWrapper>
                <img 
                  src="https://cdn0.iconfinder.com/data/icons/logos-21/40/HBO-512.png" 
                  alt="HBO Max" 
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </IconWrapper>
              <IconWrapper>
                <img 
                  src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/hulu-256.png" 
                  alt="Hulu" 
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </IconWrapper>
              <IconWrapper>
                <img 
                  src="https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-256.png" 
                  alt="Apple TV+" 
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </IconWrapper>
            </IconsContainer>
          </GlassmorphicBar>
        </Container>
      </Box>

      {/* New Vertical Metrics Section */}
      <Container>
        <VerticalMetricsSection>
          <VerticalMetric>
            <AnimatedIcon>
              <ThumbUp sx={{ 
                fontSize: '2rem', 
                color: 'white', 
                mb: 1,
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
              }} />
            </AnimatedIcon>
            <Typography variant="h6" sx={{ color: 'white' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' ,}}>2510</span> Movies Liked
            </Typography>
            <Typography variant="body2" sx={{ color: '#989898' }}>
            By film enthusiasts who share your passion for cinema
            </Typography>
          </VerticalMetric>
          <VerticalMetric>
            <AnimatedIcon>
              <List sx={{ 
                fontSize: '2rem', 
                color: 'white', 
                mb: 1,
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
              }} />
            </AnimatedIcon>
            <Typography variant="h6" sx={{ color: 'white' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' ,}}>5895</span> Watchlists Created
            </Typography>
            <Typography variant="body2" sx={{ color: '#989898' }}>
            Handpicked collections for every mood and genre
            </Typography>
          </VerticalMetric>
          <VerticalMetric>
            <AnimatedIcon>
              <Movie sx={{ 
                fontSize: '2rem', 
                color: 'white', 
                mb: 1,
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
              }} />
            </AnimatedIcon>
            <Typography variant="h6" sx={{ color: 'white' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' ,}}>6366</span> Movies & Series
            </Typography>
            <Typography variant="body2" sx={{ color: '#989898' }}>
            Spanning over 25+ streaming platforms, all in one place
            </Typography>
          </VerticalMetric>
          <VerticalMetric>
            <AnimatedIcon>
              <Visibility sx={{ 
                fontSize: '2rem', 
                color: 'white', 
                mb: 1,
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
              }} />
            </AnimatedIcon>
            <Typography variant="h6" sx={{ color: 'white' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' ,}}>5871</span> Watching Right Now
            </Typography>
            <Typography variant="body2" sx={{ color: '#989898' }}>
            Join the crowd in exploring the latest trending titles
            </Typography>
          </VerticalMetric>
        </VerticalMetricsSection>
      </Container>

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