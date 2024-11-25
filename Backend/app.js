// app.js
const express = require('express');
const { connect, PORT } = require('./config/config'); 
const authRoutes = require('./src/routes/auth');

const app = express();

// Middleware pour analyser les données JSON
app.use(express.json());

// Connexion à MongoDB via la méthode connect définie dans config/config.js
connect();

app.use('/api/auth', authRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
