import express from 'express';
import validate from '../middlewares/validate.js';
import * as socialPostValidation from '../validations/socialPostValidation.js';
import { requireApiKey, requireAuth, requirePayment } from '../middlewares/auth.js';
import {
    getAllSocialPosts,
    getSocialPostById,
    bulkCreateSocialPosts,
} from '../controllers/socialPostController.js';

const router = express.Router();

// Protected routes (require valid subscription)
// router.get('/', requireAuth, requirePayment, validate(socialPostValidation.getSocialPosts), getAllSocialPosts);
// router.get('/:id', requireAuth, requirePayment, validate(socialPostValidation.getSocialPost), getSocialPostById);
router.get('/', requireAuth, validate(socialPostValidation.getSocialPosts), getAllSocialPosts);
router.get('/:id', requireAuth, validate(socialPostValidation.getSocialPost), getSocialPostById);

// Internal routes (API key protected for bulk ingestion)
router.post('/bulk', requireApiKey, validate(socialPostValidation.bulkCreateSocialPosts), bulkCreateSocialPosts);

export default router;
