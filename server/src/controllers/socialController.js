import { SocialService } from '../services/socialService.js';

export class SocialController {
    constructor() {
        this.socialService = new SocialService();
    }

    followUser = async (req, res, next) => {
        try {
            await this.socialService.followUser(req.user.id, req.params.userId);
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    unfollowUser = async (req, res, next) => {
        try {
            await this.socialService.unfollowUser(req.user.id, req.params.userId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    getFollowers = async (req, res, next) => {
        try {
            const followers = await this.socialService.getFollowers(req.user.id);
            res.json(followers);
        } catch (error) {
            next(error);
        }
    }

    getFollowing = async (req, res, next) => {
        try {
            const following = await this.socialService.getFollowing(req.user.id);
            res.json(following);
        } catch (error) {
            next(error);
        }
    }

    getActivityFeed = async (req, res, next) => {
        try {
            const { page = 1, limit = 20 } = req.query;
            const feed = await this.socialService.getActivityFeed(req.user.id, { page, limit });
            res.json(feed);
        } catch (error) {
            next(error);
        }
    }

    getUserActivities = async (req, res, next) => {
        try {
            const { page = 1, limit = 20 } = req.query;
            const activities = await this.socialService.getUserActivities(
                req.params.userId,
                { page, limit }
            );
            res.json(activities);
        } catch (error) {
            next(error);
        }
    }
} 