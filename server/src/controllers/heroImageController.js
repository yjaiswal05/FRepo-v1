import { HeroImageService } from '../services/heroImageService.js';

export class HeroImageController {
    constructor() {
        this.heroImageService = new HeroImageService();
    }

    getHeroImages = async (req, res, next) => {
        try {
            const heroImages = await this.heroImageService.getHeroImages();
            res.json(heroImages);
        } catch (error) {
            next(error);
        }
    }
}