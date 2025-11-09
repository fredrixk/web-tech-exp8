const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Enroll in course
router.post('/:courseId', auth, async (req, res) => {
  try{
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    let enrollment = await Enrollment.findOne({ user: req.user.id, course: course.id });
    if (enrollment) return res.status(400).json({ message: 'Already enrolled' });
    enrollment = new Enrollment({ user: req.user.id, course: course.id });
    await enrollment.save();
    res.json(enrollment);
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

// List user's enrollments
router.get('/', auth, async (req, res) => {
  try{
    const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');
    res.json(enrollments);
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
