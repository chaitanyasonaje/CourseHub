import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, User, Star, CheckCircle, Loader2, GraduationCap } from 'lucide-react';
import { enrollmentAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getMyEnrollments();
      setEnrollments(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setError('Failed to load enrollments. Please try again later.');
      toast.error('Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (courseId) => {
    try {
      await enrollmentAPI.unenroll(courseId);
      toast.success('Successfully unenrolled from course!');
      fetchEnrollments(); // Refresh the list
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  const handleProgressUpdate = async (courseId, newProgress) => {
    try {
      await enrollmentAPI.updateProgress(courseId, newProgress);
      toast.success('Progress updated successfully!');
      fetchEnrollments(); // Refresh the list
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading your enrollments..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEnrollments}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My Enrollments
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Track your learning progress and manage your enrolled courses.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                  <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {enrollments.filter(e => e.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {enrollments.length > 0 
                      ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length)
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollments List */}
        {enrollments.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No enrollments yet</h3>
            <p className="text-gray-600 mb-4">
              You haven't enrolled in any courses yet. Start your learning journey!
            </p>
            <a
              href="/"
              className="btn btn-primary"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.courseId || enrollment;
              return (
                <div key={enrollment._id} className="card overflow-hidden">
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
                    
                    {/* Progress Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="badge badge-success">
                        {enrollment.progress || 0}% Complete
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
                        <Star className="w-4 h-4 mr-2" />
                        <span>Enrolled on {new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{enrollment.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${enrollment.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Progress Controls */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm text-gray-600">Update Progress:</span>
                      <select
                        value={enrollment.progress || 0}
                        onChange={(e) => handleProgressUpdate(course._id, parseInt(e.target.value))}
                        className="input py-1 px-2 text-sm"
                      >
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(progress => (
                          <option key={progress} value={progress}>
                            {progress}%
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUnenroll(course._id)}
                        className="btn btn-danger flex-1 flex items-center justify-center gap-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        Unenroll
                      </button>
                      <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Continue Learning
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Enrollments; 