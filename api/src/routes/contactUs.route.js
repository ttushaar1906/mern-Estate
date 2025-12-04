import { Router } from "express";
import { contactUs, viewInequiry } from "../controllers/contactUs.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { limiter } from "../utils/rateLimiting.js";

const router = Router()

router.post("/createInequery", verifyJWT,limiter, contactUs)
router.get("/viewInequiry", verifyJWT, viewInequiry)

export default router