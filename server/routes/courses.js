const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { mockDataService } = require('../utils/mockData');
const mongoose = require('mongoose'); // Added missing import

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Use mock data
      const courses = mockDataService.getCourses();
      return res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
      });
    }

    const courses = await Course.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Use mock data
      const course = mockDataService.getCourseById(req.params.id);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: course
      });
    }

    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin only - for demo purposes)
router.post('/', async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin only - for demo purposes)
router.put('/:id', async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin only - for demo purposes)
router.delete('/:id', async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 