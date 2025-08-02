const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { mockDataService } = require('../utils/mockData');
const mongoose = require('mongoose');

// Student ID for demo purposes
const DUMMY_STUDENT_ID = 'chaitanya0205';

// @desc    Get current student's enrollments
// @route   GET /api/enrollments/me
// @access  Private
router.get('/me', async (req, res, next) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Use mock data
      const enrollments = mockDataService.getEnrollments(DUMMY_STUDENT_ID);
      return res.status(200).json({
        success: true,
        count: enrollments.length,
        data: enrollments
      });
    }

    const enrollments = await Enrollment.find({ 
      studentId: DUMMY_STUDENT_ID,
      status: { $ne: 'dropped' }
    }).populate('courseId');

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        error: 'Course ID is required'
      });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Use mock data
      try {
        const enrollment = mockDataService.enroll(courseId, DUMMY_STUDENT_ID);
        return res.status(201).json({
          success: true,
          data: enrollment
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      courseId,
      studentId: DUMMY_STUDENT_ID,
      status: { $ne: 'dropped' }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        error: 'You are already enrolled in this course'
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      courseId,
      studentId: DUMMY_STUDENT_ID
    });

    // Populate course details
    await enrollment.populate('courseId');

    res.status(201).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Unenroll from a course
// @route   DELETE /api/enrollments/:courseId
// @access  Private
router.delete('/:courseId', async (req, res, next) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Use mock data
      try {
        const enrollment = mockDataService.unenroll(req.params.courseId, DUMMY_STUDENT_ID);
        return res.status(200).json({
          success: true,
          data: {}
        });
      } catch (error) {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      {
        courseId: req.params.courseId,
        studentId: DUMMY_STUDENT_ID,
        status: { $ne: 'dropped' }
      },
      { status: 'dropped' },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
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

// @desc    Get enrollment status for a course
// @route   GET /api/enrollments/status/:courseId
// @access  Private
router.get('/status/:courseId', async (req, res, next) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Use mock data
      const status = mockDataService.getEnrollmentStatus(req.params.courseId, DUMMY_STUDENT_ID);
      return res.status(200).json({
        success: true,
        data: status
      });
    }

    const enrollment = await Enrollment.findOne({
      courseId: req.params.courseId,
      studentId: DUMMY_STUDENT_ID,
      status: { $ne: 'dropped' }
    });

    res.status(200).json({
      success: true,
      data: {
        isEnrolled: !!enrollment,
        enrollment: enrollment || null
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update enrollment progress
// @route   PUT /api/enrollments/:courseId/progress
// @access  Private
router.put('/:courseId/progress', async (req, res, next) => {
  try {
    const { progress } = req.body;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        error: 'Progress must be between 0 and 100'
      });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Use mock data
      try {
        const enrollment = mockDataService.updateProgress(req.params.courseId, DUMMY_STUDENT_ID, progress);
        return res.status(200).json({
          success: true,
          data: enrollment
        });
      } catch (error) {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      {
        courseId: req.params.courseId,
        studentId: DUMMY_STUDENT_ID,
        status: { $ne: 'dropped' }
      },
      { progress },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        error: 'Enrollment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 