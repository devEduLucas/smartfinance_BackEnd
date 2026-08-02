import type { Request } from "express";
import { AppError } from "./AppError.js";

export function parseIdParam(req: Request, paramName = "id"): number {
  const raw = req.params[paramName];
  const value = Array.isArray(raw) ? raw[0] : raw;
  const id = Number(value);

  if (!value || !Number.isInteger(id) || id <= 0) {
    throw new AppError("Id inválido.", 400);
  }

  return id;
}
