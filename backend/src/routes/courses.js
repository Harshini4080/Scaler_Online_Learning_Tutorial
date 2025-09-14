const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const courseController = require('../controllers/courseController');
const lectureController = require('../controllers/lectureController');

// Public routes
router.get('/', courseController.getCourses);

// New routes-returns all unassigned courses (catalog)
router.get('/catalog', courseController.getCatalog); 
 

router.get('/mine', auth, permit('Instructor'), courseController.getMyCourse); 
// returns only the logged-in instructor's assigned course

router.get('/:id', courseController.getCourse);

// Instructor only routes
router.post('/', auth, permit('Instructor'), courseController.createCourse);
router.post('/:courseId/lectures', auth, permit('Instructor'), lectureController.addLecture);

// DELETE course (Instructor only)
router.delete('/:courseId', auth, permit('Instructor'), courseController.deleteCourse);

// DELETE lecture from a course (Instructor only)
router.delete('/:courseId/lectures/:lectureId', auth, permit('Instructor'), courseController.deleteLecture);

// Student (and instructor) can list lectures for a course (authenticated)
router.get('/:courseId/lectures', auth, lectureController.getLectures);

// Update lecture from course (Instructor only)
router.put('/:courseId/lectures/:lectureId', auth, permit('Instructor'), lectureController.updateLecture);


module.exports = router;
