const mongoose = require('mongoose');

// Schema for quiz questions
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },            
  options: [{ type: String, required: true }],       
  correctOption: { type: Number, required: true }    
});

// Lecture schema
const lectureSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, 
    title: { type: String, required: true },                                         
    content: { type: String, required: true },                                       
    questions: { type: [questionSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lecture', lectureSchema);
