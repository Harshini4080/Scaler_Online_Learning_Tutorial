const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

// Create lecture for a course (Instructor only)
router.post('/courses/:courseId/lectures', auth, permit('Instructor'), lectureController.addLecture);

// Get all lectures for a course
router.get('/courses/:courseId/lectures', auth, lectureController.getLectures);

// Get a single lecture
router.get('/:id', auth, lectureController.getLecture);

// Submit quiz 
router.post('/:id/submit', auth, lectureController.submitQuiz);

// Mark lecture as completed (reading complete — quiz optional)
router.post('/:id/complete', auth, lectureController.completeLecture);

// Update lecture (Instructor)
router.put('/courses/:courseId/lectures/:lectureId', auth, permit('Instructor'), lectureController.updateLecture);

// Delete lecture (Instructor)
router.delete('/courses/:courseId/lectures/:lectureId', auth, permit('Instructor'), lectureController.deleteLecture);

module.exports = router;
