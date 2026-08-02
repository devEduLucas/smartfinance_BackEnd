import { z } from "zod";

export const transactionTypeSchema = z.enum(["receita", "despesa"]);
export const transactionStatusSchema = z.enum(["confirmada", "pendente"]);

const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;

export const createTransactionSchema = z.object({
  id_categoria: z.number().int().positive(),
  valor: z.number().positive("Valor deve ser maior que zero."),
  tipo: transactionTypeSchema,
  descricao: z.string().trim().min(1, "Descrição é obrigatória.").max(200),
  data_transacao: z.string().regex(dateOnlyRegex, "Data deve estar no formato AAAA-MM-DD."),
  status: transactionStatusSchema.optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const updateTransactionSchema = createTransactionSchema.partial();

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;

export const listTransactionsQuerySchema = z.object({
  tipo: transactionTypeSchema.optional(),
  id_categoria: z.coerce.number().int().positive().optional(),
  data_inicio: z.string().regex(dateOnlyRegex).optional(),
  data_fim: z.string().regex(dateOnlyRegex).optional(),
});

export type ListTransactionsQuery = z.infer<typeof listTransactionsQuerySchema>;

export interface TransactionResponse {
  id_transacao: number;
  id_categoria: number;
  valor: number;
  tipo: "receita" | "despesa";
  descricao: string;
  data_transacao: string;
  status: "confirmada" | "pendente";
}
