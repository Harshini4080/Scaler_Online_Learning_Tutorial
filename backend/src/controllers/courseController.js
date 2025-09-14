const Course = require('../models/Course');
const Lecture = require('../models/Lecture');

/*Create a new course (only instructors can do this)*/
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const course = await Course.create({
      title,
      description,
      instructor: req.user.id
    });

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

/* Get all courses (students can browse all)*/
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

/* Get a single course with lecture count*/
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'instructor',
      'name email'
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const lectureCount = await Lecture.countDocuments({ course: course._id });
    res.json({ course, lectureCount });
  } catch (err) {
    next(err);
  }
};

/* Delete a course and all its lectures*/
exports.deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await Lecture.deleteMany({ course: courseId }); // Delete all related lectures
    await course.deleteOne();

    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    next(err);
  }
};

/* Delete a specific lecture from a course*/
exports.deleteLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findOne({ _id: lectureId, course: courseId });
    if (!lecture) return res.status(404).json({ message: 'Lecture not found' });

    await lecture.deleteOne();
    res.json({ message: 'Lecture deleted successfully' });
  } catch (err) {
    next(err);
  }
};


/* Get catalog courses (unassigned to any instructor)*/
exports.getCatalog = async (req, res, next) => {
  try {
    const courses = await Course.find({ instructor: { $exists: false } });
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

/*Get the course assigned to the logged-in instructor*/
exports.getMyCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({ instructor: req.user.id });
    if (!course)
      return res.status(404).json({ message: 'No course assigned to this instructor' });

    const lectureCount = await Lecture.countDocuments({ course: course._id });
    res.json({ course, lectureCount });
  } catch (err) {
    next(err);
  }
};
