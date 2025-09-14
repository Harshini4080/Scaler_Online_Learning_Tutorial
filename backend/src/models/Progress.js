const mongoose = require('mongoose');

// Tracks student progress in a course
const progressSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Student reference
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Course reference
  completedLectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],   // Lectures marked complete
  scores: [{                                                                        // Quiz scores per lecture
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' },
    score: Number,
    passed: Boolean
  }]
}, { timestamps: true });

progressSchema.index({ student: 1, course: 1 }, { unique: true }); // Ensure one progress doc per student-course

module.exports = mongoose.model('Progress', progressSchema);
