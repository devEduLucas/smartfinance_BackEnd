import { z } from "zod";

const currentYear = new Date().getFullYear();

export const monthlyReportQuerySchema = z.object({
  ano: z.coerce.number().int().min(2000).max(2100).default(currentYear),
});

export type MonthlyReportQuery = z.infer<typeof monthlyReportQuerySchema>;

export interface MonthlyReportItem {
  mes: string;
  total_receitas: number;
  total_despesas: number;
  saldo: number;
}
