const User = require('../models/User');
const Course = require('../models/Course'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*
 * Registers a new user.
 * - Creates a course if the user is an Instructor.
 * - Returns JWT token for authentication.
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, courseTitle, courseDescription } = req.body;

    // Basic validation
    if (!name || !email || !password || !role)
      return res.status(400).json({ message: 'Missing fields' });

    if (!['Instructor', 'Student'].includes(role))
      return res.status(400).json({ message: 'Invalid role' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    // Hash password for security
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    let createdCourse = null;

    // Create course if user is an Instructor
    if (role === 'Instructor') {
      if (!courseTitle || !courseDescription)
        return res.status(400).json({ message: 'Course title and description required' });

      createdCourse = await Course.create({
        title: courseTitle,
        description: courseDescription,
        instructor: user._id
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      course: createdCourse
    });
  } catch (err) {
    next(err);
  }
};

/* Logs in a user and returns JWT token.*/
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};
