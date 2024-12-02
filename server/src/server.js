// Importando as dependências necessárias
const express = require('express');  // Framework para criação de servidores web em Node.js
const cors = require('cors');        // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
const userRoutes = require('./routes/userRoutes');  // Importando as rotas para o usuário
const photoRoutes = require('./routes/photoRoutes'); // Importando as rotas para fotos
const path = require('path'); // Para manipulação de caminhos de arquivos

// Inicializando a aplicação express
const app = express();

// Definindo a porta que o servidor vai rodar, a partir de uma variável de ambiente
const PORT = process.env.PORT || 3000; // Define uma porta padrão caso não esteja definida na variável de ambiente

// Middleware
app.use(cors());  // Usando o middleware CORS para permitir requisições de diferentes origens
app.use(express.json());  // Usando o middleware para fazer o parse do corpo das requisições como JSON

// Serve arquivos estáticos do diretório 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Ajuste o caminho conforme necessário

// Definindo as rotas
app.use('/api/users', userRoutes);  // Definindo a rota base '/api/users' que utilizará as rotas de 'userRoutes'
app.use('/api/photos', photoRoutes);  // Definindo a rota base '/api/photos' que utilizará as rotas de 'photoRoutes'

// Iniciando o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);  // Log para confirmar que o servidor está rodando
});