import express from 'express';
import { createPersonalizedMessage } from '../controllers/messageController';

const router = express.Router();

router.post('/', createPersonalizedMessage);

export default router;