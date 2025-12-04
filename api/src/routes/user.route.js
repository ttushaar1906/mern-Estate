import express from 'express'
import { forgotPassword, getUser, newPassword, updateUser, verifyOTP } from "../controllers/user.controller.js";
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { limiter } from '../utils/rateLimiting.js';

const router = express.Router();
router.get('/user', verifyJWT, getUser)
router.post('/updateUser', verifyJWT, upload.single("avatar"), updateUser)
router.post('/forgotPassword', limiter, forgotPassword)
router.post('/verifyOTP', limiter, verifyOTP)
router.post('/newPassword', newPassword)
// update , delete

export default router;