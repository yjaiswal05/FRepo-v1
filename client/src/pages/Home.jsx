import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { ThumbUp, List, Movie, Visibility, SyncAlt, StarRate, Book, Groups } from '@mui/icons-material';

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

// Add these new styled components
const FeatureSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '60px 0',
  gap: '40px',
});

const TextSection = styled(Box)({
  flex: '1',
  maxWidth: '600px',
});

// Enhanced styled components
const FilmStripContainer = styled(Box)({
  width: '500px',
  height: '400px',
  position: 'relative',
  perspective: '1500px',
  marginRight: '-40px',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-20px',
    left: '-20px',
    right: '-20px',
    bottom: '-20px',
    background: 'radial-gradient(circle at center, rgba(255,61,71,0.1) 0%, transparent 70%)',
    filter: 'blur(15px)',
    zIndex: -1,
  }
});

const FilmStrip = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  transform: 'rotateY(-25deg) rotateX(5deg)',
  transformStyle: 'preserve-3d',
  animation: 'floatStrip 6s ease-in-out infinite',
  '@keyframes floatStrip': {
    '0%, 100%': {
      transform: 'rotateY(-25deg) rotateX(5deg) translateZ(0)',
    },
    '50%': {
      transform: 'rotateY(-22deg) rotateX(3deg) translateZ(20px)',
    }
  }
});

const FilmFrame = styled(Box)({
  flex: 1,
  position: 'relative',
  background: '#000',
  borderRadius: '4px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    width: '24px',
    height: '100%',
    background: 'repeating-linear-gradient(0deg, #000 0px, #000 4px, transparent 4px, transparent 8px)',
    opacity: 0.8,
    zIndex: 2,
  },
  '&::before': {
    left: 0,
    background: 'linear-gradient(90deg, rgba(0,0,0,0.9), transparent), repeating-linear-gradient(0deg, #000 0px, #000 4px, transparent 4px, transparent 8px)',
  },
  '&::after': {
    right: 0,
    background: 'linear-gradient(-90deg, rgba(0,0,0,0.9), transparent), repeating-linear-gradient(0deg, #000 0px, #000 4px, transparent 4px, transparent 8px)',
  }
});

const Home = () => {
  const theme = useTheme();

  const randomBackground = heroBackgrounds[Math.floor(Math.random() * heroBackgrounds.length)];

  const [activeFeature, setActiveFeature] = React.useState(0);

  const getFeatureDescription = (index) => {
    const descriptions = [
      "Effortlessly sync your watchlist and history to see all your content in one place.",
      "Whether it's a five-star masterpiece or a guilty pleasure, let others know what you think.",
      "From “Top 10 Thrillers” to “Weekend Binges,” your imagination is the only limit.",
      "Interact, comment, and share in a community that loves entertainment as much as you do."
    ];
    return descriptions[index];
  };

  const getFeatureImage = (index) => {
    const images = [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3", // Replace with your tracking image
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3", // Replace with your collections image
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3", // Replace with your watch party image
    ];
    return images[index];
  };

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

      {/* Add this new section after VerticalMetricsSection */}
      <Container>
        <FeatureSection>
          <TextSection>
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2rem', sm: '2rem', md: '2rem' },
              }}
            >
              Sync, Rate, and Discover: What You Can Do Here
            </Typography>

            {[
              { 
                title: 'Fetch Content from Your OTT Apps',
                icon: <SyncAlt sx={{ color: '#ff3d47' }} />
              },
              { 
                title: 'Rate and Review Your Favorites',
                icon: <StarRate sx={{ color: '#ff3d47' }} />
              },
              { 
                title: 'Keep a Personalized Content Diary',
                icon: <Book sx={{ color: '#ff3d47' }} />
              },
              { 
                title: 'Follow Friends and Engage',
                icon: <Groups sx={{ color: '#ff3d47' }} />
              }
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  mb: 3,
                  cursor: 'pointer',
                  '&:hover': {
                    '& .feature-title': {
                      color: '#ff3d47',
                    },
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    }
                  },
                }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  mb: 1 
                }}>
                  <Box className="feature-icon" sx={{ 
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': {
                      fontSize: '28px'
                    }
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    className="feature-title"
                    variant="h6"
                    sx={{
                      color: 'white',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {feature.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#989898',
                    maxWidth: '500px',
                    pl: '44px', // Align with the text after icon
                  }}
                >
                  {getFeatureDescription(index)}
                </Typography>
              </Box>
            ))}

            <Box sx={{ 
              mt: 4,
              pl: '200px', // Same padding-left as the description text
              maxWidth: '500px' // Same width as the description text
            }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#ff3d47',
                  padding: '8px 24px',
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  width: 'fit-content',
                  '&:hover': {
                    backgroundColor: '#ff3d47',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 15px rgba(255, 61, 71, 0.3)',
                    '&::after': {
                      transform: 'translateX(100%)',
                    }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'transform 0.5s ease',
                    transform: 'translateX(-100%)',
                  }
                }}
              >
                Get Started Now
              </Button>
            </Box>
          </TextSection>

          <FilmStripContainer>
            <FilmStrip>
              {[0, 1, 2].map((index) => (
                <FilmFrame
                  key={index}
                  sx={{
                    opacity: activeFeature === index ? 1 : 0.3,
                    transform: `translateX(${activeFeature === index ? '20px' : '-20px'}) 
                               scale(${activeFeature === index ? 1.05 : 0.95})`,
                    filter: `brightness(${activeFeature === index ? 1.2 : 0.7})
                            contrast(${activeFeature === index ? 1.1 : 0.9})`,
                    '&:hover': {
                      transform: activeFeature === index ? 
                        'translateX(20px) scale(1.07)' : 
                        'translateX(-20px) scale(0.95)',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={getFeatureImage(index)}
                    alt={`Feature ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'saturate(1.2)',
                    }}
                  />
                  {/* Film grain overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)" opacity="0.1"/%3E%3C/svg%3E')`,
                      opacity: 0.15,
                      mixBlendMode: 'overlay',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Vignette effect */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </FilmFrame>
              ))}
            </FilmStrip>
            
            {/* Enhanced film reel holes animation */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '-25px',
                width: '20px',
                background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 12px, rgba(255,255,255,0.15) 12px, rgba(255,255,255,0.15) 24px)',
                animation: 'filmScroll 2s linear infinite',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(0deg, transparent, rgba(255,61,71,0.2), transparent)',
                  animation: 'reelGlow 4s ease-in-out infinite',
                },
                '@keyframes filmScroll': {
                  '0%': { transform: 'translateY(0)' },
                  '100%': { transform: 'translateY(24px)' }
                },
                '@keyframes reelGlow': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(200px)' }
                }
              }}
            />
          </FilmStripContainer>
        </FeatureSection>
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