# CourseHub - Modern Learning Management System

A comprehensive MERN Stack project featuring a modern Learning Management System (LMS) with course listings, student enrollment, and a beautiful responsive UI. Built with best practices and production-ready code quality.

## 🎯 Project Overview

CourseHub is a full-stack web application that demonstrates modern web development practices using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It features a clean, responsive design with real-time enrollment functionality and comprehensive error handling.

### ✨ Key Features

- **Modern UI/UX**: Beautiful, responsive design with TailwindCSS
- **Real-time Enrollment**: Instant enrollment/unenrollment with live status updates
- **Advanced Filtering**: Search, category, and level-based filtering
- **Progress Tracking**: Visual progress indicators for enrolled courses
- **Toast Notifications**: User-friendly feedback for all actions
- **Error Handling**: Comprehensive error handling and validation
- **Responsive Design**: Mobile-first approach with modern animations

## 🚀 Tech Stack

- **Frontend**: React.js with TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Deployment**: 
  - Frontend → Vercel/Netlify
  - Backend → Render/Railway
  - Database → MongoDB Atlas Free Tier

## ✨ Features

- **Course Listing**: Display all available courses with modern card-based UI
- **Student Enrollment**: Enroll/unenroll from courses with real-time status updates
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Real-time Updates**: Instant UI feedback for enrollment actions
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Smooth loading animations and transitions

## 🏗️ Project Structure

```
course-listing-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── server/                 # Node.js Backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
├── .env.example
└── README.md
```

## 🛠️ Local Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. **Clone and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your MongoDB Atlas connection string:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## 🌐 API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course

### Enrollments
- `GET /api/enrollments/me` - Get current student's enrollments
- `POST /api/enrollments` - Enroll in a course
- `DELETE /api/enrollments/:courseId` - Unenroll from a course

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. **Push code to GitHub**
2. **Connect to Render/Railway**
3. **Set environment variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000 (or auto-assigned)
4. **Deploy**

### Frontend Deployment (Vercel/Netlify)

1. **Update API base URL** in `client/src/services/api.js`
2. **Connect to Vercel/Netlify**
3. **Deploy**

### Database Setup

1. **Create MongoDB Atlas cluster**
2. **Get connection string**
3. **Add to environment variables**

## 📱 Screenshots

*Screenshots will be added after deployment*

## 🎯 Key Features Implemented

### Frontend
- ✅ Modern, responsive UI with TailwindCSS
- ✅ Course cards with enrollment status
- ✅ Real-time enrollment/unenrollment
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB integration with Mongoose
- ✅ CORS and JSON middleware
- ✅ Comprehensive error handling
- ✅ Input validation

### Database
- ✅ Course and Enrollment models
- ✅ Proper indexing for performance
- ✅ Data validation

## 🧪 Testing

The application includes:
- Student ID: `chaitanya0205`
- Sample course data
- Error handling for edge cases

## 📚 Learning Outcomes

### Technical Decisions
- **TailwindCSS**: Chosen for rapid development and consistent design
- **MongoDB Atlas**: Cloud database for easy deployment and scaling
- **Modular Architecture**: Separated concerns between frontend and backend
- **Error Handling**: Comprehensive error handling for better UX

### Challenges Faced
- **CORS Configuration**: Properly configuring CORS for local development
- **State Management**: Managing enrollment status updates
- **API Design**: Creating intuitive RESTful endpoints
- **Deployment**: Setting up environment variables across platforms

### Key Learnings
- Modern React patterns with hooks
- Express.js middleware and error handling
- MongoDB Atlas integration
- Deployment best practices
- API design principles

## 🤝 Contributing

This is a learning project. Feel free to fork and improve!

## 📄 License

MIT License - feel free to use this code for your projects.

---

**Built with ❤️ using the MERN Stack** # CourseHub
