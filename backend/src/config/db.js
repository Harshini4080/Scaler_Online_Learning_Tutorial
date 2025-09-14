const mongoose = require('mongoose');

/*Connects to MongoDB using Mongoose*/
module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
