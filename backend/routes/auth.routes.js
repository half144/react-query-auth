import { Router } from "express";
import { register, me, login } from "../controllers/authController.js";
import { authGuard } from "../middleware/authGuard.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authGuard, me);

export default router;
