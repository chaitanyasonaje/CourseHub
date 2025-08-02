const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is properly configured
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('username:password')) {
      console.log('⚠️  MongoDB Atlas not configured. Using mock data for demonstration.');
      console.log('📝 To use real MongoDB:');
      console.log('1. Create a MongoDB Atlas account at https://cloud.mongodb.com/');
      console.log('2. Create a cluster and get your connection string');
      console.log('3. Update the MONGODB_URI in server/.env');
      console.log('4. Restart the server');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('📝 Please check your MongoDB Atlas connection string in server/.env');
    console.log('🔄 Starting server with mock data...');
  }
};

module.exports = connectDB; 