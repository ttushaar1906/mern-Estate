import express from 'express'
// import { deleteUser, test, updateUser,getUserListing, getUser } from '../controllers/user.controller.js';

import { getUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();
router.get('/user',verifyJWT,getUser)

// router.get('/test', test)
// router.post('/update/:id', verifyToken, updateUser)
// router.delete('/delete/:id', verifyToken, deleteUser)
// router.get('/listings/:id', verifyToken, getUserListing)
// router.get('/viewUser/:id', verifyToken, getUser)



export default router;