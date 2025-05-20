import express from 'express'
import { createListing, getlisting, viewListing } from '../controllers/listing.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';

const router = express.Router();

router.post('/create',verifyJWT, createListing);
router.get('/getListing/:id', viewListing);
router.get('/gets', getlisting)


export default router;