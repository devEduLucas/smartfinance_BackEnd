import { z } from "zod";

const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;

export const dashboardQuerySchema = z.object({
  data_inicio: z.string().regex(dateOnlyRegex).optional(),
  data_fim: z.string().regex(dateOnlyRegex).optional(),
});

export type DashboardQuery = z.infer<typeof dashboardQuerySchema>;

export interface CategoryBreakdownItem {
  id_categoria: number;
  nome: string;
  tipo: "receita" | "despesa";
  total: number;
}

export interface DashboardResponse {
  saldo: number;
  total_receitas: number;
  total_despesas: number;
  por_categoria: CategoryBreakdownItem[];
}
