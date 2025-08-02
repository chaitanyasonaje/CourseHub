const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

const sampleCourses = [
  {
    title: 'React.js Complete Guide',
    description: 'Master React.js from basics to advanced concepts including hooks, context, and state management. Build real-world applications with modern React patterns.',
    instructor: 'Sarah Johnson',
    duration: '8 weeks',
    category: 'Programming',
    level: 'Intermediate',
    price: 99,
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    title: 'Node.js Backend Development',
    description: 'Learn to build scalable backend applications with Node.js, Express, and MongoDB. Cover authentication, API design, and deployment strategies.',
    instructor: 'Michael Chen',
    duration: '10 weeks',
    category: 'Programming',
    level: 'Advanced',
    price: 129,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design. Learn to create intuitive, accessible, and beautiful digital products.',
    instructor: 'Emily Rodriguez',
    duration: '6 weeks',
    category: 'Design',
    level: 'Beginner',
    price: 79,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    title: 'Digital Marketing Strategy',
    description: 'Develop comprehensive digital marketing strategies. Learn SEO, social media marketing, content creation, and analytics to grow your business.',
    instructor: 'David Kim',
    duration: '7 weeks',
    category: 'Marketing',
    level: 'Intermediate',
    price: 89,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    title: 'Python for Data Science',
    description: 'Learn Python programming for data analysis, machine learning, and visualization. Work with pandas, numpy, matplotlib, and scikit-learn.',
    instructor: 'Alex Thompson',
    duration: '9 weeks',
    category: 'Programming',
    level: 'Intermediate',
    price: 119,
    imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    title: 'Business Analytics',
    description: 'Master business analytics tools and techniques. Learn to analyze data, create reports, and make data-driven business decisions.',
    instructor: 'Lisa Wang',
    duration: '5 weeks',
    category: 'Business',
    level: 'Advanced',
    price: 149,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    title: 'Web Development Bootcamp',
    description: 'Complete web development course covering HTML, CSS, JavaScript, and modern frameworks. Build full-stack applications from scratch.',
    instructor: 'James Wilson',
    duration: '12 weeks',
    category: 'Programming',
    level: 'Beginner',
    price: 199,
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    title: 'Product Management',
    description: 'Learn product management fundamentals, user research, product strategy, and agile methodologies to build successful products.',
    instructor: 'Rachel Green',
    duration: '8 weeks',
    category: 'Business',
    level: 'Intermediate',
    price: 139,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB...');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses...');

    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`Inserted ${courses.length} courses...`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleCourses }; 