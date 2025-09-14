const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const progressController = require('../controllers/progressController');

// Get progress for a course (completed vs total lectures)
router.get('/:courseId', auth, progressController.getCourseProgress);

module.exports = router;
