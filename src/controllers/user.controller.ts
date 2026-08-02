import type { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service.js";

export const userController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
};
