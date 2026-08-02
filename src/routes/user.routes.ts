import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { registerUserSchema } from "../types/user.types.js";

export const userRoutes = Router();

userRoutes.post("/register", validate(registerUserSchema), userController.register);
