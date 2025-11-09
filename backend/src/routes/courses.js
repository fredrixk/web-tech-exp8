const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');

// Create course (instructor/admin)
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try{
    const course = new Course({ title, description, author: req.user.id });
    await course.save();
    res.json(course);
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

// List courses
router.get('/', async (req, res) => {
  try{
    const courses = await Course.find().populate('author', 'name email');
    res.json(courses);
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try{
    const course = await Course.findById(req.params.id).populate('author', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Add lesson
router.post('/:id/lessons', auth, async (req, res) => {
  try{
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    const { title, content } = req.body;
    course.lessons.push({ title, content });
    await course.save();
    res.json(course);
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
