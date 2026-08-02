import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { googleLoginSchema, loginUserSchema } from "../types/user.types.js";

export const authRoutes = Router();

authRoutes.post("/login", validate(loginUserSchema), authController.login);
authRoutes.post("/google", validate(googleLoginSchema), authController.google);