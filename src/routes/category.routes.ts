import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../types/category.types.js";

export const categoryRoutes = Router();

categoryRoutes.use(authMiddleware);

categoryRoutes.get("/", categoryController.list);
categoryRoutes.get("/:id", categoryController.getById);
categoryRoutes.post("/", validate(createCategorySchema), categoryController.create);
categoryRoutes.put("/:id", validate(updateCategorySchema), categoryController.update);
categoryRoutes.delete("/:id", categoryController.remove);
