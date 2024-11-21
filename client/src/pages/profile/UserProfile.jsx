import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Box,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';
import { userService } from '../../services/userService';
import MovieGrid from '../../components/movie/MovieGrid';
import UserLists from '../../components/user/UserLists';
import UserReviews from '../../components/user/UserReviews';
import UserStats from '../../components/user/UserStats';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const UserProfile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [tabValue, setTabValue] = React.useState(0);
  
  const { data: profile, isLoading } = useQuery(['user', username], () =>
    userService.getUserProfile(username)
  );

  const { data: isFollowing, refetch: refetchFollowing } = useQuery(
    ['isFollowing', username],
    () => userService.checkFollowing(username),
    { enabled: !!currentUser }
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFollow = async () => {
    await userService.followUser(profile.id);
    refetchFollowing();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Avatar
              src={profile.profile_picture_url}
              alt={profile.username}
              sx={{ width: 150, height: 150, mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4">{profile.username}</Typography>
              {currentUser && currentUser.id !== profile.id && (
                <Button
                  variant={isFollowing ? "outlined" : "contained"}
                  onClick={handleFollow}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {profile.bio}
            </Typography>
            <UserStats userId={profile.id} />
          </Grid>
        </Grid>
      </Paper>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Recent Activity" />
        <Tab label="Reviews" />
        <Tab label="Lists" />
        <Tab label="Favorites" />
        <Tab label="Watchlist" />
      </Tabs>

      <Divider sx={{ mb: 3 }} />

      {tabValue === 0 && <UserActivity userId={profile.id} />}
      {tabValue === 1 && <UserReviews userId={profile.id} />}
      {tabValue === 2 && <UserLists userId={profile.id} />}
      {tabValue === 3 && <MovieGrid movies={profile.favorites} />}
      {tabValue === 4 && <MovieGrid movies={profile.watchlist} />}
    </Box>
  );
};

export default UserProfile; 