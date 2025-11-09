const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: String,
  content: String
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lessons: [LessonSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
