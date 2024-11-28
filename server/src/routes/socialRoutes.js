import express from 'express';
import { SocialController } from '../controllers/socialController.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();
const socialController = new SocialController();

// Follow routes
router.post('/follow/:userId', auth, socialController.followUser);
router.delete('/follow/:userId', auth, socialController.unfollowUser);
router.get('/followers', auth, socialController.getFollowers);
router.get('/following', auth, socialController.getFollowing);

// Activity feed
router.get('/feed', auth, socialController.getActivityFeed);
router.get('/activities/:userId', auth, socialController.getUserActivities);

export default router; 