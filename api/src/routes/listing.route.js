import express from 'express'
import { createListing, deletePropety, getlisting, updateProperty, viewListing, viewOwnerProperty } from '../controllers/listing.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.post('/create', verifyJWT, upload.fields([{ name: "coverImages", maxCount: 4 }]), createListing);
router.get('/getListing/:id', viewListing);
router.get('/gets', getlisting)
router.get('/viewOwnersProperty', verifyJWT, viewOwnerProperty)
router.delete('/deletePropety/:id', verifyJWT, deletePropety)
router.patch('/updateProperty/:id', verifyJWT, updateProperty)
// router.patch('/updateProperty/:id', verifyJWT,upload.fields([{ name: "coverImages", maxCount: 4 }]), updateProperty)

export default router;