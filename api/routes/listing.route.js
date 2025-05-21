import express from 'express'
import { createListing, getlisting, viewListing } from '../controllers/listing.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.post('/create',verifyJWT, upload.fields([{ name: "coverImages", maxCount: 10 }]), createListing);
router.get('/getListing/:id', viewListing);
router.get('/gets', getlisting)


export default router;