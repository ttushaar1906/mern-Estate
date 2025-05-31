import express from 'express'
import { googleLogIn, logout, signIn, signUp } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';

const router = express.Router()

router.post('/signUp',signUp)
router.post('/signIn',signIn)
router.post('/googleLogin',googleLogIn)
router.get('/signOut',verifyJWT, logout)

export default router;


