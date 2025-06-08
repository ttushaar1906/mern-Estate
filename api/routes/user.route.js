import express from 'express'
import { getUser, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();
router.get('/user',verifyJWT,getUser)
router.post('/updateUser',verifyJWT,upload.single("avatar"),updateUser)

// update , delete

export default router;