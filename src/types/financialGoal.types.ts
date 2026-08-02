import { z } from "zod";

const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;

export const goalStatusSchema = z.enum(["em_andamento", "concluida", "cancelada"]);

export const createGoalSchema = z.object({
  titulo: z.string().trim().min(1, "Título é obrigatório.").max(100),
  descricao: z.string().trim().max(255).optional(),
  valor_objetivo: z.number().positive("Valor objetivo deve ser maior que zero."),
  data_inicio: z.string().regex(dateOnlyRegex).optional(),
  data_fim: z.string().regex(dateOnlyRegex).optional(),
});

export type CreateGoalInput = z.infer<typeof createGoalSchema>;

export const updateGoalSchema = z.object({
  titulo: z.string().trim().min(1).max(100).optional(),
  descricao: z.string().trim().max(255).optional(),
  valor_objetivo: z.number().positive().optional(),
  status: goalStatusSchema.optional(),
  data_inicio: z.string().regex(dateOnlyRegex).optional(),
  data_fim: z.string().regex(dateOnlyRegex).optional(),
});

export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;

export const contributeGoalSchema = z.object({
  valor: z.number().positive("Valor deve ser maior que zero."),
});

export type ContributeGoalInput = z.infer<typeof contributeGoalSchema>;

export interface GoalResponse {
  id_meta: number;
  titulo: string;
  descricao: string | null;
  valor_objetivo: number;
  valor_atual: number;
  status: "em_andamento" | "concluida" | "cancelada";
  data_inicio: string | null;
  data_fim: string | null;
}
