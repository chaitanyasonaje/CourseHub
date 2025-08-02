const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB Atlas connection...');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Successfully connected to MongoDB Atlas!');
  console.log('Connection host:', mongoose.connection.host);
  process.exit(0);
})
.catch((error) => {
  console.log('❌ MongoDB Atlas connection failed:');
  console.log('Error:', error.message);
  
  if (error.message.includes('whitelist')) {
    console.log('\n📝 Solution: Add your IP to MongoDB Atlas whitelist');
    console.log('1. Go to https://cloud.mongodb.com/');
    console.log('2. Navigate to Security → Network Access');
    console.log('3. Add your IP address or use "Allow Access from Anywhere"');
  }
  
  process.exit(1);
}); 