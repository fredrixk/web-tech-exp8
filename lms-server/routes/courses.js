const express = require('express');
const Course = require('../models/Course');
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();

// Create course (instructor/admin)
router.post('/', authMiddleware, requireRole(['instructor','admin']), async (req, res) => {
  try {
    const course = new Course({ ...req.body, instructor: req.user.id });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List courses
router.get('/', async (req, res) => {
  const courses = await Course.find().populate('instructor', 'name email');
  res.json(courses);
});

// Get course
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'name email');
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

module.exports = router;
