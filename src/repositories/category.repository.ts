import { prisma } from "../lib/prisma.js";
import type { categorias } from "../generated/prisma/client.js";
import type { CreateCategoryInput, UpdateCategoryInput } from "../types/category.types.js";

export const categoryRepository = {
  findAll(): Promise<categorias[]> {
    return prisma.categorias.findMany({ orderBy: { nome: "asc" } });
  },

  findById(id: number): Promise<categorias | null> {
    return prisma.categorias.findUnique({ where: { id_categoria: id } });
  },

  create(data: CreateCategoryInput): Promise<categorias> {
    return prisma.categorias.create({
      data: {
        nome: data.nome,
        tipo: data.tipo,
        icone: data.icone ?? null,
        cor: data.cor ?? null,
      },
    });
  },

  update(id: number, data: UpdateCategoryInput): Promise<categorias> {
    return prisma.categorias.update({
      where: { id_categoria: id },
      data: {
        ...(data.nome !== undefined && { nome: data.nome }),
        ...(data.tipo !== undefined && { tipo: data.tipo }),
        ...(data.icone !== undefined && { icone: data.icone }),
        ...(data.cor !== undefined && { cor: data.cor }),
      },
    });
  },

  delete(id: number): Promise<categorias> {
    return prisma.categorias.delete({ where: { id_categoria: id } });
  },
};
