import express from 'express';
import { HeroImageController } from '../controllers/heroImageController.js';

const router = express.Router();
const heroImageController = new HeroImageController();

router.get('/', heroImageController.getHeroImages);

export default router;