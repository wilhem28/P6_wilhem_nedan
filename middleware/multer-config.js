// Importation du middleware multer
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Création d'un dictionnaire
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Vérifier de l'existence du dossier 'images' ou création de ce dernier 
const checkImgFolder = async () => {

    fs.mkdir(path.join(__dirname, '../images'), (err) => {
        if (err) {
            return console.error("Le dossier existe déjà");
        } else
        console.log('Dossier crée !');
    });
}
checkImgFolder(); 


const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, 'images');
  }, 
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');