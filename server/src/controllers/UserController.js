const { z } = require('zod');
const UserService = require('../services/UserService');

class UserController {

  async createUser(req, res) {
    const { username, email, password } = req.body;

    try {
      const newUser = await UserService.createUser({ username, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Método para buscar um usuário pelo ID.
  async getUserById(req, res) {
    const { id } = req.params;

    try {
      const idSchema = z.number().int(); // Validação para garantir que o ID seja um inteiro
      idSchema.parse(Number(id)); // Convertemos o ID recebido em número

      const user = await UserService.getUserById(Number(id)); // Passamos o ID como número
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedUser = await UserService.updateUser(Number(id), updateData); // Passamos o ID como número
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const result = await UserService.deleteUser(Number(id)); // Passamos o ID como número
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();