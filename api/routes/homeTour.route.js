import { Router } from "express";
import { scheduleHomeTour, viewUpcomingTours } from "../controllers/homeTour.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";

const router = Router()

router.get('/viewHomeTour',verifyJWT,viewUpcomingTours)
router.post('/scheduleHomeTour', verifyJWT, scheduleHomeTour)

export default router;

