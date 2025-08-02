# CourseHub - MERN Stack Setup Guide

This guide will help you set up and run the CourseHub Learning Management System locally.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd course-listing-app

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Database Setup

1. **Create MongoDB Atlas Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a free account
   - Create a new cluster
   - Get your connection string

2. **Configure Environment Variables**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Update `.env` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-listing?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

### 3. Seed Database

```bash
cd server
node utils/seedData.js
```

This will populate your database with sample courses.

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
Frontend will run on `http://localhost:3000`

## 🛠️ Development

### Backend Structure
```
server/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── Course.js            # Course schema
│   └── Enrollment.js        # Enrollment schema
├── routes/
│   ├── courses.js           # Course API routes
│   └── enrollments.js       # Enrollment API routes
├── middleware/
│   └── errorHandler.js      # Error handling
├── utils/
│   └── seedData.js          # Database seeding
└── server.js                # Main server file
```

### Frontend Structure
```
client/
├── src/
│   ├── components/
│   │   ├── CourseCard.jsx   # Course display component
│   │   ├── Header.jsx       # Navigation header
│   │   └── LoadingSpinner.jsx # Loading component
│   ├── pages/
│   │   └── CourseList.jsx   # Main course listing page
│   ├── services/
│   │   └── api.js          # API service layer
│   ├── App.js              # Main app component
│   └── index.css           # TailwindCSS styles
└── public/
    └── index.html          # HTML template
```

## 🔧 API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses` - Create new course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Enrollments
- `GET /api/enrollments/me` - Get current student's enrollments
- `POST /api/enrollments` - Enroll in a course
- `DELETE /api/enrollments/:courseId` - Unenroll from course
- `GET /api/enrollments/status/:courseId` - Get enrollment status
- `PUT /api/enrollments/:courseId/progress` - Update progress

### Health Check
- `GET /api/health` - Server health status

## 🎨 Features

### Frontend
- ✅ Modern, responsive UI with TailwindCSS
- ✅ Course cards with enrollment status
- ✅ Real-time enrollment/unenrollment
- ✅ Search and filtering functionality
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback
- ✅ Grid/List view toggle
- ✅ Category and level filters

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB integration with Mongoose
- ✅ CORS and security middleware
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Rate limiting
- ✅ Health check endpoint

### Database
- ✅ Course and Enrollment models
- ✅ Proper indexing for performance
- ✅ Data validation
- ✅ Sample data seeding

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect to Render/Railway
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000 (or auto-assigned)
4. Deploy

### Frontend (Vercel/Netlify)
1. Update API base URL in `client/src/services/api.js`
2. Connect to Vercel/Netlify
3. Deploy

### Environment Variables for Production
```bash
# Backend (.env)
MONGODB_URI=your_production_mongodb_uri
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com

# Frontend (.env)
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 🧪 Testing

### Demo Student
- Student ID: `chaitanya0205`
- Used for all enrollment actions
- No authentication required for demo

### Sample Data
The seeding script creates 8 sample courses:
- React.js Complete Guide
- Node.js Backend Development
- UI/UX Design Fundamentals
- Digital Marketing Strategy
- Python for Data Science
- Business Analytics
- Web Development Bootcamp
- Product Management

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your connection string
   - Ensure IP whitelist includes your IP
   - Verify username/password

2. **CORS Error**
   - Check CORS_ORIGIN in backend .env
   - Ensure frontend URL matches

3. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes

4. **Module Not Found**
   - Run `npm install` in both directories
   - Clear node_modules and reinstall

### Debug Commands
```bash
# Check backend health
curl http://localhost:5000/api/health

# Check frontend API connection
curl http://localhost:5000/api/courses

# View server logs
cd server && npm run dev

# View frontend logs
cd client && npm start
```

## 📚 Learning Outcomes

### Technical Skills Demonstrated
- **React.js**: Modern hooks, state management, component architecture
- **Node.js/Express**: RESTful API design, middleware, error handling
- **MongoDB**: Schema design, indexing, data validation
- **TailwindCSS**: Responsive design, utility-first CSS
- **Deployment**: Environment configuration, platform-specific setup

### Best Practices Implemented
- ✅ Clean code architecture
- ✅ Error handling and validation
- ✅ Security middleware
- ✅ Performance optimization
- ✅ Responsive design
- ✅ User experience considerations

## 🎯 Next Steps

### Potential Enhancements
1. **Authentication & Authorization**
   - JWT token-based auth
   - Role-based access control
   - User registration/login

2. **Advanced Features**
   - Course progress tracking
   - Video streaming
   - Discussion forums
   - Payment integration

3. **Performance**
   - Image optimization
   - Caching strategies
   - Database optimization

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E testing

---

**Happy Coding! 🚀** 