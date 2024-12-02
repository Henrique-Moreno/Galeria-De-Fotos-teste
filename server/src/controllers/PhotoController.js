// controllers/PhotoController.js
const PhotoService = require('../services/PhotoService');

class PhotoController {

  async createPhoto(req, res) {
    const { title, userId } = req.body; // Extrai título e userId do corpo da requisição

    if (!req.file) { // Verifica se o arquivo foi enviado corretamente
      return res.status(400).json({ error: 'Arquivo não enviado' });
    }

    const filename = req.file.filename; // Obtém o nome do arquivo da imagem

    try {
      const newPhoto = await PhotoService.createPhoto({ title, filename, userId });
      res.status(201).json(newPhoto);
    } catch (error) {
      console.error('Erro ao criar foto:', error);
      res.status(500).json({ error: 'Erro ao criar foto' });
    }
  }

  async getPhotos(req, res) {
    try {
      const photos = await PhotoService.getPhotos();
      res.status(200).json(photos);
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
      res.status(500).json({ error: 'Erro ao buscar fotos' });
    }
  }

  async getPhotoById(req, res) {
    const { id } = req.params;

    try {
      const photo = await PhotoService.getPhotoById(Number(id));
      if (!photo) return res.status(404).json({ error: 'Foto não encontrada' });
      res.status(200).json(photo);
    } catch (error) {
      console.error('Erro ao buscar foto:', error);
      res.status(500).json({ error: 'Erro ao buscar foto' });
    }
  }

  async updatePhoto(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    if (!req.file) { // Verifica se o arquivo foi enviado corretamente durante a atualização
      return res.status(400).json({ error: 'Arquivo não enviado' });
    }

    try {
      const updatedPhoto = await PhotoService.updatePhoto(Number(id), { title, url: req.file.filename });
      if (!updatedPhoto) return res.status(404).json({ error: 'Foto não encontrada' });
      res.status(200).json(updatedPhoto);
    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      res.status(500).json({ error: 'Erro ao atualizar foto' });
    }
  }

  async deletePhoto(req, res) {
    const { id } = req.params;

    try {
      await PhotoService.deletePhoto(Number(id));
      res.status(204).json({ message: 'Foto deletada com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      res.status(500).json({ error: 'Erro ao deletar foto' });
    }
  }
}

// Exporta a instância do controlador de fotos
module.exports = new PhotoController();