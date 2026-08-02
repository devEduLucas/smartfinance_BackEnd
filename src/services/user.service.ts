import { userRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/AppError.js";
import { hashPassword } from "../utils/hashPassword.js";
import type { RegisterUserInput, UserResponse } from "../types/user.types.js";

function splitFullName(fullName: string): { nome: string; sobrenome: string | null } {
  const [nome, ...rest] = fullName.trim().split(/\s+/);
  const sobrenome = rest.length > 0 ? rest.join(" ") : null;
  return { nome: nome ?? fullName.trim(), sobrenome };
}

export function toUserResponse(user: {
  id_usuario: number;
  nome: string;
  sobrenome: string | null;
  email: string;
}): UserResponse {
  return {
    id_usuario: user.id_usuario,
    nome: user.nome,
    sobrenome: user.sobrenome,
    email: user.email,
  };
}

export const userService = {
  async register(input: RegisterUserInput): Promise<UserResponse> {
    const existingUser = await userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new AppError("E-mail já cadastrado.", 409);
    }

    const { nome, sobrenome } = splitFullName(input.fullName);
    const senhaHash = await hashPassword(input.password);

    const user = await userRepository.create({
      nome,
      sobrenome,
      email: input.email,
      senha: senhaHash,
    });

    return toUserResponse(user);
  },
};
