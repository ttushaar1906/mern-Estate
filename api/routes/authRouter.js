import express from 'express'
import { googleLogIn, signIn, signUp } from '../controllers/auth.controller.js';
// import { signUp, signIn, google, signOut } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signUp',signUp)
router.post('/signIn',signIn)
router.post('/googleLogin',googleLogIn)
// router.get('/signOut',signOut)

export default router;


