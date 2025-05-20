import express from 'express'
import { getUser } from "../controllers/user.controller.js";
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';

const router = express.Router();
router.get('/user',verifyJWT,getUser)

// update , delete

export default router;