import { Router } from "express";
import { contactUs } from "../controllers/contactUs.js";

const router = Router()

router.post("/createInequery",contactUs)

export default router