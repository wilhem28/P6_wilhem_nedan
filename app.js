// Importation du framework express
const express = require('express');

// Appel de l'objet express
const app = express();

// Importation de l'outil de modélisation d'objets MongoDB
const mongoose = require('mongoose');

// Importation du module de chemin de Node.js
const path = require('path');

// Importation des routes des sauces
const sauceRoutes = require('./routes/Sauces');

// Importation des routes des utilisateurs
const userRoutes = require('./routes/User');

// Connexion à la base de données MongoDB
mongoose.connect(process.env.DB_USER_PASS,
  {useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Mise en place du mécanisme CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Parser les requêtes
app.use(express.json());

// Parser le corps du formulaire
app.use(express.urlencoded({extended: true}));

// Middleware des images 
app.use('/images', express.static(path.join(__dirname, 'images')));

// middleware des routes des sauces
app.use('/api/sauces', sauceRoutes);

// Middleware des routes des utilisateurs
app.use('/api/auth', userRoutes);

// Exportation du fichier app.js
module.exports = app;