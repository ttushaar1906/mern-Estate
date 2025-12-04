import express from 'express'
import { createListing, deletePropety, getlisting, toggleSold, updateProperty, viewListing, viewOwnerProperty } from '../controllers/listing.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { limiter } from '../utils/rateLimiting.js';

const router = express.Router();

router.post('/create', verifyJWT,limiter, upload.fields([{ name: "coverImages", maxCount: 4 }]), createListing);
router.get('/getListing/:id', viewListing);
router.get('/gets', getlisting)
router.get('/viewOwnersProperty', verifyJWT, viewOwnerProperty)
router.delete('/deletePropety/:id', verifyJWT, deletePropety)
router.patch('/updateProperty/:id', verifyJWT, upload.array("images", 4), updateProperty)
router.patch('/changeStatus/:id', verifyJWT, limiter, toggleSold)
export default router;