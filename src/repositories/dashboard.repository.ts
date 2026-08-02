import { prisma } from "../lib/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

export interface DashboardFilters {
  data_inicio?: Date;
  data_fim?: Date;
}

function buildWhere(userId: number, filters: DashboardFilters): Prisma.transacoesWhereInput {
  return {
    id_usuario: userId,
    status: "confirmada",
    ...((filters.data_inicio !== undefined || filters.data_fim !== undefined) && {
      data_transacao: {
        ...(filters.data_inicio !== undefined && { gte: filters.data_inicio }),
        ...(filters.data_fim !== undefined && { lte: filters.data_fim }),
      },
    }),
  };
}

export const dashboardRepository = {
  async sumByTipo(
    userId: number,
    filters: DashboardFilters
  ): Promise<{ receitas: Prisma.Decimal | null; despesas: Prisma.Decimal | null }> {
    const [receitas, despesas] = await Promise.all([
      prisma.transacoes.aggregate({
        where: { ...buildWhere(userId, filters), tipo: "receita" },
        _sum: { valor: true },
      }),
      prisma.transacoes.aggregate({
        where: { ...buildWhere(userId, filters), tipo: "despesa" },
        _sum: { valor: true },
      }),
    ]);

    return { receitas: receitas._sum.valor, despesas: despesas._sum.valor };
  },

  async sumByCategoria(
    userId: number,
    filters: DashboardFilters
  ): Promise<Array<{ id_categoria: number; total: Prisma.Decimal | null }>> {
    const groups = await prisma.transacoes.groupBy({
      by: ["id_categoria"],
      where: buildWhere(userId, filters),
      _sum: { valor: true },
    });

    return groups.map((group) => ({
      id_categoria: group.id_categoria,
      total: group._sum.valor,
    }));
  },
};
