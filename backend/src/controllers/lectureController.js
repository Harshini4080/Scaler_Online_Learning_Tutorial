const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const Progress = require('../models/Progress');

// Add a new lecture (Instructor only)
exports.addLecture = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const { title, content, questions } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.instructor || course.instructor.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not allowed' });

    const lecture = await Lecture.create({
      course: courseId,
      title,
      content: content || '',
      questions: Array.isArray(questions) ? questions : []
    });

    res.status(201).json(lecture);
  } catch (err) {
    next(err);
  }
};

// Update lecture (Instructor only)
exports.updateLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;
    const { title, content, questions } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.instructor || course.instructor.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not allowed' });

    const lecture = await Lecture.findOne({ _id: lectureId, course: courseId });
    if (!lecture) return res.status(404).json({ message: 'Lecture not found' });

    lecture.title = title ?? lecture.title;
    lecture.content = content ?? lecture.content;
    lecture.questions = Array.isArray(questions) ? questions : lecture.questions;

    await lecture.save();
    res.json(lecture);
  } catch (err) {
    next(err);
  }
};

// Get all lectures in a course
exports.getLectures = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const lectures = await Lecture.find({ course: courseId }).sort('createdAt'); // Sort by creation
    res.json(lectures);
  } catch (err) {
    next(err);
  }
};

// Get single lecture (hide correct answers)
exports.getLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.findById(req.params.id).lean();
    if (!lecture) return res.status(404).json({ message: 'Lecture not found' });

    if (lecture.questions && lecture.questions.length > 0) {
      lecture.questions = lecture.questions.map(q => ({
        _id: q._id,
        text: q.text,
        options: q.options // hide correctOption
      }));
    }

    res.json(lecture);
  } catch (err) {
    next(err);
  }
};

// Middleware: ensure sequential access (student)
exports.canAccessLecture = async (req, res, next) => {
  try {
    const lectureId = req.params.id;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    const courseLectures = await Lecture.find({ course: lecture.course }).sort("createdAt");
    const lectureIndex = courseLectures.findIndex(l => l._id.equals(lecture._id));

    if (lectureIndex === 0) return next(); // allow first lecture

    const progress = await Progress.findOne({ student: req.user.id, course: lecture.course });
    if (!progress || !progress.completedLectures.includes(courseLectures[lectureIndex - 1]._id)) {
      return res.status(403).json({ message: "Complete previous lecture first." });
    }

    next();
  } catch (err) {
    next(err);
  }
};

// Mark lecture as completed
exports.completeLecture = async (req, res, next) => {
  try {
    const lectureId = req.params.id;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) return res.status(404).json({ message: 'Lecture not found' });

    let progress = await Progress.findOne({ student: req.user.id, course: lecture.course });
    if (!progress) {
      progress = await Progress.create({ student: req.user.id, course: lecture.course, completedLectures: [], scores: [] });
    }

    if (!progress.completedLectures.includes(lecture._id)) {
      progress.completedLectures.push(lecture._id);
      await progress.save();
    }

    res.json({ message: 'Lecture marked as completed' });
  } catch (err) {
    next(err);
  }
};

// Submit quiz (optional) — store score
exports.submitQuiz = async (req, res, next) => {
  try {
    const lectureId = req.params.id;
    const { answers } = req.body;
    if (!Array.isArray(answers)) return res.status(400).json({ message: 'Answers must be an array' });

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) return res.status(404).json({ message: 'Lecture not found' });

    let correctCount = 0;
    lecture.questions.forEach((q, idx) => {
      if (typeof answers[idx] === 'number' && answers[idx] === q.correctOption) correctCount++;
    });

    const total = lecture.questions.length;
    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const passed = score >= 70;

    let progress = await Progress.findOne({ student: req.user.id, course: lecture.course });
    if (!progress) {
      progress = await Progress.create({ student: req.user.id, course: lecture.course, completedLectures: [], scores: [] });
    }

    progress.scores.push({ lecture: lecture._id, score, passed });
    await progress.save();

    res.json({ score, passed, correctCount, total });
  } catch (err) {
    next(err);
  }
};

// Delete lecture (Instructor only)
exports.deleteLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findOne({ _id: lectureId, course: courseId });
    if (!lecture) return res.status(404).json({ message: 'Lecture not found' });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.instructor || course.instructor.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not allowed' });

    await lecture.deleteOne();
    res.json({ message: 'Lecture deleted successfully' });
  } catch (err) {
    next(err);
  }
};
