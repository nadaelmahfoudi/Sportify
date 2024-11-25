// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

// Schéma pour l'utilisateur
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please fill a valid phone number'],  
  },
}, {
  timestamps: true, 
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Génération du sel
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Création du modèle User
const User = mongoose.model('User', userSchema);

module.exports = User;
