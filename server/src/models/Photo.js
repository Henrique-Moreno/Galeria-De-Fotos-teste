// models/Photo.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PhotoModel {
  async createPhoto(data) {
    return await prisma.photo.create({ data });
  }

  async getPhotos() {
    return await prisma.photo.findMany();
  }

  async getPhotoById(id) {
    return await prisma.photo.findUnique({
      where: { id: Number(id) },
    });
  }

  async updatePhoto(id, data) {
    return await prisma.photo.update({
      where: { id: Number(id) },
      data,
    });
  }

  async deletePhoto(id) {
    return await prisma.photo.delete({
      where: { id: Number(id) },
    });
  }
}

// Exporta uma instância da classe PhotoModel
module.exports = new PhotoModel();