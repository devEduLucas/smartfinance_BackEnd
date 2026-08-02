import { z } from "zod";

export const categoryTypeSchema = z.enum(["receita", "despesa"]);

export const createCategorySchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório.").max(50),
  tipo: categoryTypeSchema,
  icone: z.string().trim().max(50).optional(),
  cor: z.string().trim().max(20).optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export interface CategoryResponse {
  id_categoria: number;
  nome: string;
  tipo: "receita" | "despesa";
  icone: string | null;
  cor: string | null;
}
