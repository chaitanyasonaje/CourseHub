const sampleCourses = [
  {
    _id: 'course1',
    title: 'React.js Complete Guide',
    description: 'Master React.js from basics to advanced concepts including hooks, context, and state management. Build real-world applications with modern React patterns.',
    instructor: 'Sarah Johnson',
    duration: '8 weeks',
    category: 'Programming',
    level: 'Intermediate',
    price: 99,
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'course2',
    title: 'Node.js Backend Development',
    description: 'Learn to build scalable backend applications with Node.js, Express, and MongoDB. Cover authentication, API design, and deployment strategies.',
    instructor: 'Michael Chen',
    duration: '10 weeks',
    category: 'Programming',
    level: 'Advanced',
    price: 129,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'course3',
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design. Learn to create intuitive, accessible, and beautiful digital products.',
    instructor: 'Emily Rodriguez',
    duration: '6 weeks',
    category: 'Design',
    level: 'Beginner',
    price: 79,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'course4',
    title: 'Digital Marketing Strategy',
    description: 'Develop comprehensive digital marketing strategies. Learn SEO, social media marketing, content creation, and analytics to grow your business.',
    instructor: 'David Kim',
    duration: '7 weeks',
    category: 'Marketing',
    level: 'Intermediate',
    price: 89,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'course5',
    title: 'Python for Data Science',
    description: 'Learn Python programming for data analysis, machine learning, and visualization. Work with pandas, numpy, matplotlib, and scikit-learn.',
    instructor: 'Alex Thompson',
    duration: '9 weeks',
    category: 'Programming',
    level: 'Intermediate',
    price: 119,
    imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'course6',
    title: 'Business Analytics',
    description: 'Master business analytics tools and techniques. Learn to analyze data, create reports, and make data-driven business decisions.',
    instructor: 'Lisa Wang',
    duration: '5 weeks',
    category: 'Business',
    level: 'Advanced',
    price: 149,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'course7',
    title: 'Web Development Bootcamp',
    description: 'Complete web development course covering HTML, CSS, JavaScript, and modern frameworks. Build full-stack applications from scratch.',
    instructor: 'James Wilson',
    duration: '12 weeks',
    category: 'Programming',
    level: 'Beginner',
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'course8',
    title: 'Product Management',
    description: 'Learn product management fundamentals, user research, product strategy, and agile methodologies to build successful products.',
    instructor: 'Rachel Green',
    duration: '8 weeks',
    category: 'Business',
    level: 'Intermediate',
    price: 139,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock enrollments storage
let mockEnrollments = [];

const mockDataService = {
  // Get all courses
  getCourses: () => {
    return sampleCourses;
  },

  // Get course by ID
  getCourseById: (id) => {
    return sampleCourses.find(course => course._id === id);
  },

  // Get enrollments for a student
  getEnrollments: (studentId) => {
    return mockEnrollments.filter(enrollment => enrollment.studentId === studentId);
  },

  // Enroll in a course
  enroll: (courseId, studentId) => {
    const course = sampleCourses.find(c => c._id === courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const existingEnrollment = mockEnrollments.find(
      e => e.courseId === courseId && e.studentId === studentId
    );

    if (existingEnrollment) {
      throw new Error('Already enrolled in this course');
    }

    const enrollment = {
      _id: `enrollment_${Date.now()}`,
      courseId,
      studentId,
      enrollmentDate: new Date(),
      status: 'active',
      progress: 0,
      courseId: course // Include course details
    };

    mockEnrollments.push(enrollment);
    return enrollment;
  },

  // Unenroll from a course
  unenroll: (courseId, studentId) => {
    const enrollmentIndex = mockEnrollments.findIndex(
      e => e.courseId === courseId && e.studentId === studentId
    );

    if (enrollmentIndex === -1) {
      throw new Error('Enrollment not found');
    }

    mockEnrollments[enrollmentIndex].status = 'dropped';
    return mockEnrollments[enrollmentIndex];
  },

  // Get enrollment status
  getEnrollmentStatus: (courseId, studentId) => {
    const enrollment = mockEnrollments.find(
      e => e.courseId === courseId && e.studentId === studentId && e.status === 'active'
    );
    return {
      isEnrolled: !!enrollment,
      enrollment: enrollment || null
    };
  },

  // Update progress
  updateProgress: (courseId, studentId, progress) => {
    const enrollment = mockEnrollments.find(
      e => e.courseId === courseId && e.studentId === studentId && e.status === 'active'
    );

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    enrollment.progress = progress;
    return enrollment;
  }
};

module.exports = { mockDataService, sampleCourses }; 