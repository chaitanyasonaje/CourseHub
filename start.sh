#!/bin/bash

echo "🚀 CourseHub - MERN Stack Setup"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  Backend environment file not found!"
    echo "Please create a .env file in the server directory with:"
    echo "MONGODB_URI=your_mongodb_atlas_connection_string"
    echo "PORT=5000"
    echo "NODE_ENV=development"
    echo "CORS_ORIGIN=http://localhost:3000"
    echo ""
    echo "You can copy from env.example: cp env.example .env"
    echo ""
    read -p "Press Enter to continue..."
else
    echo "✅ Backend environment configured"
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../client
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your MongoDB Atlas connection in server/.env"
echo "2. Seed the database: cd server && node utils/seedData.js"
echo "3. Start the backend: cd server && npm run dev"
echo "4. Start the frontend: cd client && npm start"
echo ""
echo "The application will be available at:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo "" 