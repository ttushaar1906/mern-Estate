import express from 'express'
import { createListing, deleteListing, updateListing, viewListing , getlisting} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id',verifyToken, deleteListing);
router.post('/update/:id',verifyToken, updateListing);
router.get('/getListing/:id', viewListing);
router.get('/gets', getlisting)



export default router;