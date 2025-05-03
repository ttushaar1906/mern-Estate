import express from 'express'
import { signUp } from '../controllers/auth.controller.js';
// import { signUp, signIn, google, signOut } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signUp',signUp)
// router.post('/signIn',signIn)
// router.post('/google',google)
// router.get('/signOut',signOut)

export default router;


