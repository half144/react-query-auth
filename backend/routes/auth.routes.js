import { Router } from "express";
import { register, me, login } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);

export default router;
