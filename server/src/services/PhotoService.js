// services/PhotoService.js
const PhotoModel = require('../models/Photo');

class PhotoService {
  async createPhoto({ title, filename, userId }) {
    return await PhotoModel.createPhoto({ title, url: filename, userId: Number(userId) }); // Armazenamos filename como URL
  }

  async getPhotos() {
    return await PhotoModel.getPhotos();
  }

  async getPhotoById(id) {
    return await PhotoModel.getPhotoById(Number(id));
  }

  async updatePhoto(id, data) {
    return await PhotoModel.updatePhoto(Number(id), data);
  }

  async deletePhoto(id) {
    return await PhotoModel.deletePhoto(Number(id));
  }
}

// Exporta uma instância da classe PhotoService
module.exports = new PhotoService();