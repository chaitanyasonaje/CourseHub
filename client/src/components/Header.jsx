import React from 'react';
import { BookOpen, User, GraduationCap } from 'lucide-react';

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">
                CourseHub
              </h1>
              <p className="text-xs text-gray-500">Learning Management System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('courses')}
              className={`transition-colors duration-200 flex items-center space-x-1 ${
                currentPage === 'courses' 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Courses</span>
            </button>
            <button
              onClick={() => setCurrentPage('enrollments')}
              className={`transition-colors duration-200 flex items-center space-x-1 ${
                currentPage === 'enrollments' 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Enrollments</span>
            </button>
          </nav>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Dummy Student</p>
                <p className="text-xs text-gray-500">dummyStudent123</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 