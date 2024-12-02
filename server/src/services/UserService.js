const { z } = require('zod');
const UserModel = require('../models/User');

class UserService {
  // Método para criar um novo usuário
  async createUser({ username, email, password }) {
    const userSchema = z.object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    userSchema.parse({ username, email, password });
    return await UserModel.createUser({ username, email, password });
  }

  // Método para buscar um usuário pelo ID
  async getUserById(userId) {
    const idSchema = z.number().int(); // Validação para garantir que o ID seja um inteiro
    idSchema.parse(userId); // Isso lançará um erro se o ID não for válido

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  // Método para atualizar um usuário pelo ID
  async updateUser(userId, updateData) {
    const idSchema = z.number().int();
    idSchema.parse(userId);

    const updateSchema = z.object({
      username: z.string().min(3).optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
    });

    updateSchema.parse(updateData);

    const updatedUser = await UserModel.updateById(userId, updateData);
    if (!updatedUser) {
      throw new Error('Usuário não encontrado ou não pôde ser atualizado');
    }
    return updatedUser;
  }

  // Método para deletar um usuário pelo ID
  async deleteUser(userId) {
    const idSchema = z.number().int();
    idSchema.parse(userId);

    const result = await UserModel.deleteById(userId);
    if (!result) {
      throw new Error('Usuário não encontrado ou não pôde ser deletado');
    }
    return { message: 'Usuário deletado com sucesso' };
  }

  // Método para buscar todos os usuários
  async getAllUsers() {
    return await UserModel.findAll();
  }
}

// Exportando uma instância da classe UserService para uso em outras partes da aplicação
module.exports = new UserService();