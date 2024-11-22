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
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    transform: 'translateY(-2px)',
    color: '#fff',
  },
  '& .MuiButton-startIcon': {
    marginRight: '6px',
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
  
  '&:hover, &:focus-within': {
    width: '300px',
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  
  ...(isfocused === 'true' && {
    width: '300px',
    backgroundColor: alpha(theme.palette.common.white, 0.1),
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.7rem 2rem',
        gap: 2,
      }}>
        {/* Logo Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
        }}>
          <LocalMoviesIcon 
            sx={{ 
              color: '#ff3d47',
              fontSize: '2rem',
              filter: 'drop-shadow(0 0 8px rgba(255,61,71,0.3))',
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
          gap: 1,
        }}>
          <NavButton startIcon={<LocalMoviesIcon />} component={Link} to="/movies">
            Movies
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
        </Box>

        {/* Right Section */}
        <Box>
          <NavButton 
            startIcon={<AccountCircleIcon />} 
            component={Link} 
            to="/login"
            sx={{
              border: '1px solid rgba(255,255,255,0.2)',
              '&:hover': {
                border: '1px solid rgba(255,255,255,0.4)',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
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