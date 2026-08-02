import { categoryRepository } from "../repositories/category.repository.js";
import { AppError } from "../utils/AppError.js";
import type {
  CategoryResponse,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types/category.types.js";

function toCategoryResponse(category: {
  id_categoria: number;
  nome: string;
  tipo: string;
  icone: string | null;
  cor: string | null;
}): CategoryResponse {
  return {
    id_categoria: category.id_categoria,
    nome: category.nome,
    tipo: category.tipo as CategoryResponse["tipo"],
    icone: category.icone,
    cor: category.cor,
  };
}

export const categoryService = {
  async list(): Promise<CategoryResponse[]> {
    const categories = await categoryRepository.findAll();
    return categories.map(toCategoryResponse);
  },

  async getById(id: number): Promise<CategoryResponse> {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    return toCategoryResponse(category);
  },

  async create(input: CreateCategoryInput): Promise<CategoryResponse> {
    const category = await categoryRepository.create(input);
    return toCategoryResponse(category);
  },

  async update(id: number, input: UpdateCategoryInput): Promise<CategoryResponse> {
    await categoryService.getById(id);
    const category = await categoryRepository.update(id, input);
    return toCategoryResponse(category);
  },

  async remove(id: number): Promise<void> {
    await categoryService.getById(id);
    await categoryRepository.delete(id);
  },
};
