import express from 'express'
import { googleLogIn, logout, refreshAccessToken, signIn, signUp } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { limiter } from '../utils/rateLimiting.js';

const router = express.Router()

router.post('/signUp', limiter, signUp)
router.post('/signIn', limiter, signIn)
router.post('/googleLogin',limiter, googleLogIn)
router.get('/signOut', verifyJWT, logout)
router.post('/refreshAccessToken', refreshAccessToken)

export default router;


