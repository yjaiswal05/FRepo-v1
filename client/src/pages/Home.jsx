import React from 'react';
import { Box, Typography, Container, Button, Tabs, Tab, IconButton, Chip, Tooltip, Grid, Stack, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { ThumbUp, List, Movie, Visibility, SyncAlt, StarRate, Book, Groups, ArrowBackIos, ArrowForwardIos, Whatshot, Star, NewReleases, Update, LocalFireDepartment, Theaters, AutoAwesome, Schedule, Favorite, Facebook, Twitter, Instagram, YouTube, KeyboardArrowUp } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import Icon from '../components/Icon';
import { getHeroImages } from '../services/heroImageService';
import axios from 'axios';

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

// Add this styled tooltip component
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  '& .MuiTooltip-tooltip': {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: '8px 12px',
    fontSize: '0.75rem',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
});

// Add this array of movie poster URLs
const moviePosters = [
  "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg", // Oppenheimer
  "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg", // Barbie
  "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg", // Anyone But You
  "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", // Avengers
  "https://image.tmdb.org/t/p/w500/A7SobaUTvb6d6gFCXyID8bQmd8i.jpg", // Wonka
  "https://image.tmdb.org/t/p/w500/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg", // Aquaman
  "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", // Migration
  "https://image.tmdb.org/t/p/w500/jXJxMcVoEuXzql3lXPi8jqAQwR4.jpg", // Mean Girls
  "https://image.tmdb.org/t/p/w500/cGXFosYUHYjjdKrOmA0bbjvzhKz.jpg", // Poor Things
  "https://image.tmdb.org/t/p/w500/mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg", // Madame Web
];

const MovieSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollContainerRef = useRef(null);
  const filterScrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Function to handle filter scroll
  const handleFilterScroll = (direction) => {
    if (filterScrollRef.current) {
      const scrollAmount = 200;
      filterScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const tabs = [
    { 
      label: "Trending Now", 
      icon: <LocalFireDepartment sx={{ 
        color: activeTab === 0 ? '#ff3d47' : '#989898',
        mr: 1,
        animation: activeTab === 0 ? 'flicker 1.5s infinite' : 'none',
        '@keyframes flicker': {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.8,
            transform: 'scale(1.1)',
          },
        }
      }}/> 
    },
    { 
      label: "Popular", 
      icon: <AutoAwesome sx={{ 
        color: activeTab === 1 ? '#ff3d47' : '#989898',
        mr: 1,
        animation: activeTab === 1 ? 'sparkle 2s infinite' : 'none',
        '@keyframes sparkle': {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg)',
          },
          '50%': {
            transform: 'scale(1.2) rotate(180deg)',
          },
        }
      }}/> 
    },
    { 
      label: "Premier", 
      icon: <Theaters sx={{ 
        color: activeTab === 2 ? '#ff3d47' : '#989898',
        mr: 1,
        transition: 'transform 0.3s ease',
        transform: activeTab === 2 ? 'scale(1.1)' : 'scale(1)',
      }}/> 
    },
    { 
      label: "Recently Added", 
      icon: <Schedule sx={{ 
        color: activeTab === 3 ? '#ff3d47' : '#989898',
        mr: 1,
        animation: activeTab === 3 ? 'pulse 2s infinite' : 'none',
        '@keyframes pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
        }
      }}/> 
    }
  ];

  // Filter chips data
  const filterChips = [
    'All',
    'Action',
    'Comedy',
    'Drama',
    'Thriller',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Adventure',
    'Animation',
    'Crime',
    'Documentary',
    'Fantasy',
    'Mystery',
  ];

  return (
    <Container sx={{ mt: 8 }}>
      <Box sx={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Subtle background
        borderRadius: '12px',
        padding: '16px 24px', // Padding around all tabs
        mb: 4,
      }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#ff3d47',
              height: '3px',
              borderRadius: '3px',
            },
            '& .MuiTabs-flexContainer': {
              gap: '32px', // Space between tabs
              justifyContent: 'center', // Center the tabs
            }
          }}
        >
          {tabs.map((tab, index) => (
            <Tab 
              key={index}
              icon={tab.icon}
              label={tab.label}
              iconPosition="start"
              sx={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 0.5,
                padding: '8px 16px', // Padding within each tab
                minWidth: 'auto',
                transform: activeTab === index ? 'scale(1.15)' : 'scale(1)',
                transformOrigin: 'center center',
                transition: 'transform 0.3s ease',
                '& .MuiSvgIcon-root': {
                  marginBottom: '0 !important',
                  marginRight: '8px',
                  fontSize: '22px',
                },
                '&.Mui-selected': {
                  color: '#ff3d47',
                  fontWeight: '500',
                },
                '&:hover': {
                  color: '#ff3d47',
                  opacity: 0.8,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Filter Chips with Navigation Buttons */}
      <Box sx={{ 
        position: 'relative',
        mt: 2,
        mb: 3,
      }}>
        {/* Left Navigation Button */}
        <IconButton
          onClick={() => handleFilterScroll('left')}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: '32px',
            height: '32px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.9)',
            },
            // Show/hide based on scroll position
            '&::before': {
              content: '""',
              position: 'absolute',
              right: '100%',
              top: 0,
              bottom: 0,
              width: '30px',
              background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.8))',
            }
          }}
        >
          <ArrowBackIos sx={{ fontSize: '18px', color: 'white', ml: 1 }} />
        </IconButton>

        {/* Scrollable Filter Container */}
        <Box
          ref={filterScrollRef}
          sx={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome, Safari, Edge
            },
            mx: '40px', // Space for buttons
            px: 1,
          }}
        >
          {filterChips.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onClick={() => setActiveFilter(filter)}
              sx={{
                backgroundColor: activeFilter === filter ? '#ff3d47' : 'rgba(255, 255, 255, 0.08)',
                color: activeFilter === filter ? 'white' : '#989898',
                borderRadius: '20px',
                px: 1,
                height: '32px',
                fontSize: '0.9rem',
                fontWeight: activeFilter === filter ? '500' : '400',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: activeFilter === filter 
                    ? '#ff3d47' 
                    : 'rgba(255, 255, 255, 0.15)',
                },
                transition: 'all 0.3s ease',
                border: activeFilter === filter 
                  ? '1px solid rgba(255,61,71,0.5)' 
                  : '1px solid rgba(255,255,255,0.1)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            />
          ))}
        </Box>

        {/* Right Navigation Button */}
        <IconButton
          onClick={() => handleFilterScroll('right')}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: '32px',
            height: '32px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.9)',
            },
            // Show/hide based on scroll position
            '&::before': {
              content: '""',
              position: 'absolute',
              left: '100%',
              top: 0,
              bottom: 0,
              width: '30px',
              background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.8))',
            }
          }}
        >
          <ArrowForwardIos sx={{ fontSize: '18px', color: 'white' }} />
        </IconButton>
      </Box>

      {/* Movies Scroll Section */}
      <Box sx={{ position: 'relative' }}>
        {/* Left Arrow */}
        <IconButton 
          onClick={() => handleScroll('left')}
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,61,71,0.8)',
            },
            zIndex: 2,
          }}
        >
          <ArrowBackIos />
        </IconButton>

        {/* Movies Container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: '20px',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            py: 2,
            px: 1,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((movie) => (
            <Box
              key={movie}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '200px', // Original width
                flexShrink: 0,
              }}
            >
              {/* Movie Card */}
              <Box
                sx={{
                  width: '200px',
                  height: '300px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={moviePosters[movie - 1]} // Using index to get poster URL
                  alt={`Movie ${movie}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              {/* Movie Details Below Card */}
              <Box sx={{ mt: 2 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'white',
                    fontWeight: '500',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      color: '#ff3d47',
                    },
                    transition: 'color 0.2s ease',
                    cursor: 'pointer',
                  }}
                >
                  Movie Title {movie}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 0.5 
                }}>
                  {/* Genre and Year */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1,
                  }}>
                    <Typography variant="caption" sx={{ color: '#989898' }}>
                      2024
                    </Typography>
                    <Box sx={{ 
                      width: '3px', 
                      height: '3px', 
                      borderRadius: '50%', 
                      backgroundColor: '#989898' 
                    }} />
                    <Typography variant="caption" sx={{ color: '#989898' }}>
                      Action
                    </Typography>
                  </Box>

                  {/* Icons with Stats */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 2,
                  }}>
                    <StyledTooltip 
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="caption">1.2K Likes</Typography>
                        </Box>
                      }
                      arrow
                      placement="top"
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          '& .MuiSvgIcon-root': { color: '#ff3d47' },
                        }
                      }}>
                        <Favorite sx={{ 
                          fontSize: '16px', 
                          color: '#989898',
                          transition: 'color 0.2s ease',
                        }} />
                      </Box>
                    </StyledTooltip>

                    <StyledTooltip 
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="caption">3.4K Views</Typography>
                        </Box>
                      }
                      arrow
                      placement="top"
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          '& .MuiSvgIcon-root': { color: '#ff3d47' },
                        }
                      }}>
                        <Visibility sx={{ 
                          fontSize: '16px', 
                          color: '#989898',
                          transition: 'color 0.2s ease',
                        }} />
                      </Box>
                    </StyledTooltip>

                    <StyledTooltip 
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="caption">4.5 Rating</Typography>
                          <Star sx={{ fontSize: '12px', color: '#ffd700' }} />
                        </Box>
                      }
                      arrow
                      placement="top"
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          '& .MuiSvgIcon-root': { color: '#ffd700' },
                        }
                      }}>
                        <Star sx={{ 
                          fontSize: '16px', 
                          color: '#989898',
                          transition: 'color 0.2s ease',
                        }} />
                      </Box>
                    </StyledTooltip>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton 
          onClick={() => handleScroll('right')}
          sx={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,61,71,0.8)',
            },
            zIndex: 2,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Container>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box 
      sx={{ 
        mt: 8,
        pt: 6,
        pb: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container>
        {/* Back to Top Button */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mb: 4 
          }}
        >
          <IconButton 
            onClick={scrollToTop}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 61, 71, 0.2)',
                '& .MuiSvgIcon-root': {
                  color: '#ff3d47'
                }
              }
            }}
          >
            <KeyboardArrowUp sx={{ color: '#989898' }} />
          </IconButton>
        </Box>

        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              MovieHub
            </Typography>
            <Typography variant="body2" sx={{ color: '#989898', mb: 2 }}>
              Your ultimate destination for movies and TV shows. Track, rate, and discover your next favorite.
            </Typography>
            {/* Social Links */}
            <Stack direction="row" spacing={2}>
              {[Facebook, Twitter, Instagram, YouTube].map((Icon, index) => (
                <IconButton 
                  key={index}
                  sx={{
                    color: '#989898',
                    '&:hover': {
                      color: '#ff3d47'
                    }
                  }}
                >
                  <Icon src={Icon} alt={Icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Quick Links
            </Typography>
            {['Home', 'Movies', 'TV Shows', 'My List', 'About Us'].map((link) => (
              <Typography 
                key={link}
                variant="body2" 
                sx={{ 
                  color: '#989898', 
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#ff3d47'
                  }
                }}
              >
                {link}
              </Typography>
            ))}
          </Grid>

          {/* Help & Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Help & Support
            </Typography>
            {['FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((link) => (
              <Typography 
                key={link}
                variant="body2" 
                sx={{ 
                  color: '#989898', 
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#ff3d47'
                  }
                }}
              >
                {link}
              </Typography>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: '#989898', mb: 2 }}>
              Subscribe to our newsletter for updates and exclusive content.
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Your email"
              fullWidth
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff3d47',
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box 
          sx={{ 
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ color: '#989898' }}>
            © 2024 MovieHub. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: '#989898' }}>
            Made with ❤️ for movie lovers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const Home = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFeature, setActiveFeature] = React.useState(0);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hero-images');
        setHeroImages(response.data);
      } catch (error) {
        console.error('Error fetching hero images:', error);
      }
    };

    fetchHeroImages();
  }, []);

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
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '90vh',
          width: '100vw',
          position: 'relative',
          mb: 6,
          background: heroImages.length > 0 
            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), 
               url('https://image.tmdb.org/t/p/original${heroImages[Math.floor(Math.random() * heroImages.length)]?.backdrop_path}')`
            : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '-100px',
          marginLeft: '-24px',
          marginRight: '-24px',
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
                    onError={(e) => {
                      console.log(`Failed to load image for Feature ${index + 1}`);
                      setImageError(prev => ({...prev, [index]: true}));
                      // Optionally set a fallback image
                      e.target.src = 'https://picsum.photos/1200/800'; // fallback image
                    }}
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

      {/* New Movie Section with Tabs */}
      <MovieSection />
      <Footer />
    </Box>
  );
};

export default Home;