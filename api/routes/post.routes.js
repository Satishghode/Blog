import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { create } from '../controllers/post.controller.js';
import {getPosts} from '../controllers/post.controller.js'

const router = express.Router();

router.post('/create', verifyUser, create);
router.get('/getPosts', getPosts  );

export default router;