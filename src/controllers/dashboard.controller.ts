import type { NextFunction, Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service.js";
import { dashboardQuerySchema } from "../types/dashboard.types.js";
import { AppError } from "../utils/AppError.js";

export const dashboardController = {
  async getSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new AppError("Não autenticado.", 401);
      }

      const query = dashboardQuerySchema.parse(req.query);
      const summary = await dashboardService.getSummary(req.userId, query);
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  },
};
