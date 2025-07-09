import { Router } from "express";
import { cancelHomeVisit, scheduleHomeTour, viewUpcomingTours } from "../controllers/homeTour.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";

const router = Router()

router.get('/viewHomeTour',verifyJWT,viewUpcomingTours)
router.post('/scheduleHomeTour', verifyJWT, scheduleHomeTour)
router.patch('/cancelHomeTour/:id',verifyJWT, cancelHomeVisit)

export default router;

