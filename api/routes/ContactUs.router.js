import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { contactUs } from '../controllers/ContactUs.controller.js';

const router = express.Router();

router.post('/contactUs', verifyToken, contactUs)

export default router;