import { Router } from "express";
import { transactionController } from "../controllers/transaction.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createTransactionSchema, updateTransactionSchema } from "../types/transaction.types.js";

export const transactionRoutes = Router();

transactionRoutes.use(authMiddleware);

transactionRoutes.get("/", transactionController.list);
transactionRoutes.get("/:id", transactionController.getById);
transactionRoutes.post("/", validate(createTransactionSchema), transactionController.create);
transactionRoutes.put("/:id", validate(updateTransactionSchema), transactionController.update);
transactionRoutes.delete("/:id", transactionController.remove);
