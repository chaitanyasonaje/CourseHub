const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required']
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    trim: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped'],
    default: 'active'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate enrollments
enrollmentSchema.index({ courseId: 1, studentId: 1 }, { unique: true });

// Virtual for formatted enrollment date
enrollmentSchema.virtual('formattedEnrollmentDate').get(function() {
  return this.enrollmentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Ensure virtual fields are serialized
enrollmentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema); 