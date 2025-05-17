import { Router } from "express";
import { contactUs, viewInequiry } from "../controllers/contactUs.js";
// import { verifyToken } from "../utils/verifyUser.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router()

router.post("/createInequery",verifyJWT,contactUs)
router.get("/viewInequiry",verifyJWT,viewInequiry)

export default router