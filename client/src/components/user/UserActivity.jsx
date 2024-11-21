import React from 'react';
import { useInfiniteQuery } from 'react-query';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { socialService } from '../../services/socialService';
import LoadingSpinner from '../common/LoadingSpinner';

const UserActivity = ({ userId }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    ['userActivity', userId],
    ({ pageParam = 1 }) => socialService.getUserActivities(userId, { page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  if (isLoading) return <LoadingSpinner />;

  const activities = data?.pages.flatMap((page) => page.activities) || [];

  const renderActivityContent = (activity) => {
    switch (activity.type) {
      case 'REVIEW':
        return (
          <>
            reviewed{' '}
            <Link to={`/movies/${activity.movie_id}`}>
              {activity.movie_title}
            </Link>
          </>
        );
      case 'LIST':
        return (
          <>
            created a new list{' '}
            <Link to={`/lists/${activity.list_id}`}>
              {activity.list_title}
            </Link>
          </>
        );
      case 'FOLLOW':
        return (
          <>
            followed{' '}
            <Link to={`/users/${activity.target_user_id}`}>
              {activity.target_username}
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                src={activity.user.profile_picture_url}
                alt={activity.user.username}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography component="span">
                  <Link
                    to={`/users/${activity.user_id}`}
                    style={{ fontWeight: 'bold' }}
                  >
                    {activity.user.username}
                  </Link>{' '}
                  {renderActivityContent(activity)}
                </Typography>
              }
              secondary={formatDistanceToNow(new Date(activity.created_at), {
                addSuffix: true,
              })}
            />
          </ListItem>
        ))}
      </List>

      {hasNextPage && (
        <Box display="flex" justifyContent="center" my={2}>
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outlined"
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load more'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserActivity; 