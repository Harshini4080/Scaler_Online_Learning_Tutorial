const mongoose = require('mongoose');

// Course schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: String,                     
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true }); 

module.exports = mongoose.model('Course', courseSchema);
