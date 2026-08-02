import { Prisma } from "../generated/prisma/client.js";

export function toMoneyNumber(value: Prisma.Decimal | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  return typeof value === "number" ? value : value.toNumber();
}

export function toDecimal(value: number): Prisma.Decimal {
  return new Prisma.Decimal(value);
}
