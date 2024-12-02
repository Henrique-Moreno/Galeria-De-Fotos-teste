// Importa a classe PrismaClient da biblioteca @prisma/client, que é usada para interagir com o banco de dados
const { PrismaClient } = require('@prisma/client');

// Cria uma instância do PrismaClient para realizar operações no banco de dados
const prisma = new PrismaClient();

// Define a classe UserModel, que contém métodos para gerenciar usuários no banco de dados
class UserModel {
  // Método assíncrono para criar um novo usuário no banco de dados
  async createUser(data) {
    const existingUser = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUser) {
      throw new Error('Nome de usuário já existe.');
    }
    return await prisma.user.create({ data });
  }

  // Método assíncrono para encontrar um usuário pelo email no banco de dados
  async findUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  // Método assíncrono para buscar todos os usuários
  async findAll() {
    return await prisma.user.findMany(); // Use findMany para obter todos os usuários
  }

  // Método assíncrono para encontrar um usuário pelo ID
  async findById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  // Método assíncrono para atualizar um usuário pelo ID
  async updateById(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  // Método assíncrono para deletar um usuário pelo ID
  async deleteById(id) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

// Exporta uma instância da classe UserModel para que outros módulos possam utilizá-la
module.exports = new UserModel();