import type { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.js";
import { AppError } from "../utils/AppError.js";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(409).json({ message: "Registro já existe." });
      return;
    }
    if (err.code === "P2025") {
      res.status(404).json({ message: "Registro não encontrado." });
      return;
    }
  }

  console.error(err);
  res.status(500).json({ message: "Erro interno do servidor." });
}
