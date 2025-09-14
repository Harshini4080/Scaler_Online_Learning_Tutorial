require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const lectureRoutes = require('./routes/lectures');
const progressRoutes = require('./routes/progress');
const errorHandler = require('./middleware/errorHandler');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/progress', progressRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Backend API is running ');
});

