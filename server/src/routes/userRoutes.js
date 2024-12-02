const express = require('express');
const UserController = require('../controllers/UserController');
const { validateCreateUser, validateLogin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para criar usuário
router.post('/register', validateCreateUser, UserController.createUser);

// Rota para buscar todos os usuários
router.get('/', UserController.getAllUsers);

// Rota para buscar um usuário pelo ID
router.get('/:id', UserController.getUserById);

// Rota para atualizar um usuário pelo ID
router.put('/:id', UserController.updateUser);

// Rota para deletar um usuário pelo ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;