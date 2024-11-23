import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  InputBase,
  alpha,
  styled
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

// Styled Components
const NavButton = styled(Button)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.85),
  padding: theme.spacing(0.8, 2),
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  letterSpacing: '0.3px',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    transform: 'translateY(-2px)',
    color: '#fff',
    '& .MuiSvgIcon-root': {
      transform: 'rotate(10deg) scale(1.1)',
    },
  },
  '& .MuiButton-startIcon': {
    marginRight: '6px',
    '& .MuiSvgIcon-root': {
      transition: 'transform 0.3s ease',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '4px',
    left: '50%',
    transform: 'translateX(-50%) scale(0)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#ff3d47',
    transition: 'transform 0.3s ease',
  },
  '&:hover::after': {
    transform: 'translateX(-50%) scale(1)',
  },
}));

const Search = styled('div')(({ theme, isfocused }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  padding: theme.spacing(0.8, 2),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  width: '100px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  color: alpha(theme.palette.common.white, 0.85),
  cursor: 'pointer',
  border: '1px solid transparent',
  
  '&:hover, &:focus-within': {
    width: '300px',
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  },
  
  ...(isfocused === 'true' && {
    width: '300px',
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 0 20px rgba(0,0,0,0.15)',
  }),
}));

const SearchIconWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  position: 'absolute',
  left: '16px',
  color: 'inherit',
  pointerEvents: 'none',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s ease',
  },
  '[isfocused="true"] &': {
    '& .MuiSvgIcon-root': {
      transform: 'rotate(-90deg)',
    },
  },
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.8, 1, 0.8, 0),
    paddingLeft: '85px',
    width: '100%',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    '&::placeholder': {
      opacity: 0,
      transition: 'opacity 0.2s',
    },
    '&:focus::placeholder': {
      opacity: 1,
    },
  },
}));

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <AppBar 
      position="fixed" 
      sx={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.7rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        gap: 4,
      }}>
        {/* Logo Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          flex: '0 0 auto',
          marginRight: 2,
        }}>
          <LocalMoviesIcon 
            sx={{ 
              color: '#ff3d47',
              fontSize: '2rem',
              filter: 'drop-shadow(0 0 8px rgba(255,61,71,0.3))',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  filter: 'drop-shadow(0 0 8px rgba(255,61,71,0.3))',
                },
                '50%': {
                  filter: 'drop-shadow(0 0 12px rgba(255,61,71,0.5))',
                },
                '100%': {
                  filter: 'drop-shadow(0 0 8px rgba(255,61,71,0.3))',
                },
              },
            }} 
          />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              fontWeight: 700,
              letterSpacing: '0.5px',
              color: '#fff',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#ff3d47',
                textShadow: '0 0 15px rgba(255,61,71,0.3)',
              },
            }}
          >
            FilmSocial
          </Typography>
        </Box>

        {/* Center Navigation */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flex: '0 1 auto',
          justifyContent: 'center',
        }}>
          <NavButton startIcon={<LocalMoviesIcon />} component={Link} to="/movies">
            Movies
          </NavButton>
          <NavButton 
            startIcon={<NewspaperIcon />} 
            component={Link} 
            to="/news"
            sx={{
              '&::before': {
                content: '"NEW"',
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#ff3d47',
                color: 'white',
                fontSize: '0.6rem',
                padding: '2px 6px',
                borderRadius: '10px',
                fontWeight: 'bold',
                animation: 'bounce 2s infinite',
              },
              '@keyframes bounce': {
                '0%, 100%': {
                  transform: 'translateY(0)',
                },
                '50%': {
                  transform: 'translateY(-3px)',
                },
              }
            }}
          >
            News
          </NavButton>
          <Search 
            ref={searchRef}
            isfocused={isFocused.toString()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: '1.2rem' }} />
              <Typography 
                sx={{ 
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                }}
              >
                Search
              </Typography>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search films..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              isfocused={isFocused.toString()}
            />
          </Search>
          <NavButton startIcon={<BookmarkIcon />} component={Link} to="/watchlist">
            Watchlist
          </NavButton>
          <NavButton 
            startIcon={<QueueMusicIcon />} 
            component={Link} 
            to="/soundtracks"
            sx={{
              '& .MuiSvgIcon-root': {
                animation: 'musicWave 1.5s infinite',
              },
              '@keyframes musicWave': {
                '0%': {
                  transform: 'scale(1) rotate(0deg)',
                },
                '25%': {
                  transform: 'scale(1.1) rotate(-5deg)',
                },
                '75%': {
                  transform: 'scale(1.1) rotate(5deg)',
                },
                '100%': {
                  transform: 'scale(1) rotate(0deg)',
                },
              },
              '&:hover .MuiSvgIcon-root': {
                animation: 'musicWave 0.8s infinite',
              }
            }}
          >
            Soundtracks
          </NavButton>
        </Box>

        {/* Right Section */}
        <Box sx={{
          flex: '0 0 auto',
          marginLeft: 2,
        }}>
          <NavButton 
            startIcon={<AccountCircleIcon />} 
            component={Link} 
            to="/login"
            sx={{
              backgroundColor: '#ff3d47',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transform: 'translateX(-100%)',
              },
              '&:hover': {
                backgroundColor: alpha('#ff3d47', 0.9),
                transform: 'translateY(-2px)',
                boxShadow: '0 0 20px rgba(255, 61, 71, 0.4)',
                '&::before': {
                  transform: 'translateX(100%)',
                  transition: 'transform 0.6s ease-in-out',
                }
              },
              transition: 'all 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            Login
          </NavButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;