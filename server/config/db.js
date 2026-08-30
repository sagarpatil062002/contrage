import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.warn('⚠️ MONGODB_URI not found in environment variables. Running in mock/disconnected mode.');
      return false;
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} [DB: ${conn.connection.name}]`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
    return false;
  }
};
