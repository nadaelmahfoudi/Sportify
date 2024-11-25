// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

// Schéma pour l'utilisateur
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Enregistre la date de création et de mise à jour
});

// Fonction de comparaison du mot de passe
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Création du modèle User
const User = mongoose.model('User', userSchema);

module.exports = User;
