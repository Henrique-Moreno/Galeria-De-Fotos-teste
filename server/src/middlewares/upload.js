// middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cria o diretório 'uploads' se não existir
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Diretório onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Renomeia o arquivo com timestamp e nome original
  },
});

// Cria o middleware do multer
const upload = multer({ storage });

// Exporta o middleware
module.exports = upload;