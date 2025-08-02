@echo off
echo 🚀 CourseHub - MERN Stack Setup
echo ================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd server
if not exist "node_modules" (
    npm install
) else (
    echo ✅ Backend dependencies already installed
)

REM Check if .env file exists
if not exist ".env" (
    echo.
    echo ⚠️  Backend environment file not found!
    echo Please create a .env file in the server directory with:
    echo MONGODB_URI=your_mongodb_atlas_connection_string
    echo PORT=5000
    echo NODE_ENV=development
    echo CORS_ORIGIN=http://localhost:3000
    echo.
    echo You can copy from env.example: copy env.example .env
    echo.
    pause
) else (
    echo ✅ Backend environment configured
)

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
cd ..\client
if not exist "node_modules" (
    npm install
) else (
    echo ✅ Frontend dependencies already installed
)

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Configure your MongoDB Atlas connection in server/.env
echo 2. Seed the database: cd server ^&^& node utils/seedData.js
echo 3. Start the backend: cd server ^&^& npm run dev
echo 4. Start the frontend: cd client ^&^& npm start
echo.
echo The application will be available at:
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
pause 