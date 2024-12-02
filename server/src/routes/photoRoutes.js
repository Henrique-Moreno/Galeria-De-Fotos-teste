// routes/photoRoutes.js
const express = require('express');
const PhotoController = require('../controllers/PhotoController');
const upload = require('../middlewares/upload'); // Middleware para upload de arquivos

const router = express.Router();

// Rota para criar uma nova foto
router.post('/', upload.single('image'), PhotoController.createPhoto); // O campo 'image' deve corresponder ao nome do arquivo

// Rota para buscar todas as fotos
router.get('/', PhotoController.getPhotos);

// Rota para buscar uma foto por ID
router.get('/:id', PhotoController.getPhotoById);

// Rota para atualizar uma foto por ID
router.put('/:id', upload.single('image'), PhotoController.updatePhoto); 

// Rota para deletar uma foto por ID
router.delete('/:id', PhotoController.deletePhoto);

// Exporta o roteador para que ele possa ser usado em outras partes da aplicação
module.exports = router;