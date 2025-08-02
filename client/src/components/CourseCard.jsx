import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, User, Star, CheckCircle, Loader2 } from 'lucide-react';
import { enrollmentAPI } from '../services/api';
import toast from 'react-hot-toast';

const CourseCard = ({ course }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);

  // Check enrollment status on component mount
  useEffect(() => {
    checkEnrollmentStatus();
  }, [course._id]);

  const checkEnrollmentStatus = async () => {
    try {
      const response = await enrollmentAPI.getStatus(course._id);
      setIsEnrolled(response.data.isEnrolled);
      setEnrollmentStatus(response.data.enrollment);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
    }
  };

  const handleEnrollment = async () => {
    setIsLoading(true);
    try {
      if (isEnrolled) {
        // Unenroll
        await enrollmentAPI.unenroll(course._id);
        setIsEnrolled(false);
        setEnrollmentStatus(null);
        toast.success('Successfully unenrolled from course!');
      } else {
        // Enroll
        const response = await enrollmentAPI.enroll(course._id);
        setIsEnrolled(true);
        setEnrollmentStatus(response.data);
        toast.success('Successfully enrolled in course!');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'badge-success';
      case 'Intermediate':
        return 'badge-warning';
      case 'Advanced':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Programming':
        return 'bg-blue-100 text-blue-800';
      case 'Design':
        return 'bg-purple-100 text-purple-800';
      case 'Business':
        return 'bg-green-100 text-green-800';
      case 'Marketing':
        return 'bg-orange-100 text-orange-800';
      case 'Technology':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card overflow-hidden animate-fade-in">
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-purple-600">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Enrollment Status Badge */}
        {isEnrolled && (
          <div className="absolute top-3 right-3">
            <div className="badge badge-success flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Enrolled
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`badge ${getCategoryColor(course.category)}`}>
            {course.category}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Course Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Course Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-2" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="w-4 h-4 mr-2" />
            <span className={`badge ${getLevelColor(course.level)}`}>
              {course.level}
            </span>
          </div>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm text-gray-600">4.8 (120 reviews)</span>
          </div>
          <div className="text-lg font-semibold text-primary-600">
            ${course.price}
          </div>
        </div>

        {/* Enrollment Button */}
        <button
          onClick={handleEnrollment}
          disabled={isLoading}
          className={`w-full btn ${
            isEnrolled 
              ? 'btn-danger' 
              : 'btn-primary'
          } flex items-center justify-center gap-2`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isEnrolled ? 'Unenrolling...' : 'Enrolling...'}
            </>
          ) : (
            <>
              {isEnrolled ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Unenroll
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  Enroll Now
                </>
              )}
            </>
          )}
        </button>

        {/* Progress Bar (if enrolled) */}
        {isEnrolled && enrollmentStatus && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{enrollmentStatus.progress || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${enrollmentStatus.progress || 0}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard; 