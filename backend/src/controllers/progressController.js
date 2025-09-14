const Progress = require('../models/Progress');
const Lecture = require('../models/Lecture');
const Course = require('../models/Course');

// Get a student's progress in a course
exports.getCourseProgress = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const totalLectures = await Lecture.countDocuments({ course: courseId }); // Total lectures in course

    let progress = await Progress.findOne({ student: req.user.id, course: courseId });
    if (!progress) progress = { completedLectures: [] };

    const completedCount = progress.completedLectures.length;

    res.json({
      completed: completedCount,
      total: totalLectures,
      percent: totalLectures === 0 ? 0 : Math.round((completedCount / totalLectures) * 100) // Completion %
    });
  } catch (err) {
    next(err);
  }
};
