const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },                       
  email: { type: String, required: true, unique: true, lowercase: true }, 
  password: { type: String, required: true },                   
  role: { type: String, enum: ['Instructor', 'Student'], required: true } 
}, { timestamps: true }); 

module.exports = mongoose.model('User', userSchema);
