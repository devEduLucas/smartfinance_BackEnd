import type { Request, Response } from "express";

export function notFoundMiddleware(_req: Request, res: Response): void {
  res.status(404).json({ message: "Rota não encontrada." });
}
