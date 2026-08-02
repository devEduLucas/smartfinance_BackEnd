import type { NextFunction, Request, Response } from "express";
import { reportService } from "../services/report.service.js";
import { monthlyReportQuerySchema } from "../types/report.types.js";
import { AppError } from "../utils/AppError.js";

export const reportController = {
  async monthly(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.userId) {
        throw new AppError("Não autenticado.", 401);
      }

      const query = monthlyReportQuerySchema.parse(req.query);
      const report = await reportService.monthly(req.userId, query.ano);
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  },
};
