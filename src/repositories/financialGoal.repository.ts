import { prisma } from "../lib/prisma.js";
import type { metas_financeiras, Prisma } from "../generated/prisma/client.js";

export const financialGoalRepository = {
  findAllByUser(userId: number): Promise<metas_financeiras[]> {
    return prisma.metas_financeiras.findMany({
      where: { id_usuario: userId },
      orderBy: { created_at: "desc" },
    });
  },

  findByIdAndUser(id: number, userId: number): Promise<metas_financeiras | null> {
    return prisma.metas_financeiras.findFirst({ where: { id_meta: id, id_usuario: userId } });
  },

  create(
    userId: number,
    data: {
      titulo: string;
      descricao?: string;
      valor_objetivo: Prisma.Decimal;
      data_inicio?: Date;
      data_fim?: Date;
    }
  ): Promise<metas_financeiras> {
    return prisma.metas_financeiras.create({
      data: {
        id_usuario: userId,
        titulo: data.titulo,
        descricao: data.descricao ?? null,
        valor_objetivo: data.valor_objetivo,
        data_inicio: data.data_inicio ?? null,
        data_fim: data.data_fim ?? null,
      },
    });
  },

  update(
    id: number,
    data: {
      titulo?: string;
      descricao?: string;
      valor_objetivo?: Prisma.Decimal;
      valor_atual?: Prisma.Decimal;
      status?: "em_andamento" | "concluida" | "cancelada";
      data_inicio?: Date;
      data_fim?: Date;
    }
  ): Promise<metas_financeiras> {
    return prisma.metas_financeiras.update({
      where: { id_meta: id },
      data: {
        ...(data.titulo !== undefined && { titulo: data.titulo }),
        ...(data.descricao !== undefined && { descricao: data.descricao }),
        ...(data.valor_objetivo !== undefined && { valor_objetivo: data.valor_objetivo }),
        ...(data.valor_atual !== undefined && { valor_atual: data.valor_atual }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.data_inicio !== undefined && { data_inicio: data.data_inicio }),
        ...(data.data_fim !== undefined && { data_fim: data.data_fim }),
      },
    });
  },

  delete(id: number): Promise<metas_financeiras> {
    return prisma.metas_financeiras.delete({ where: { id_meta: id } });
  },
};
