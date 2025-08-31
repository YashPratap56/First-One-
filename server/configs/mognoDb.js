import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.warn('MONGODB_URI environment variable is not defined, using localhost');
            // Use localhost as fallback
            const uri = 'mongodb://localhost:27017/ArcaneBg';
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000, // 5 second timeout
                socketTimeoutMS: 45000, // 45 second timeout
                connectTimeoutMS: 10000, // 10 second timeout
            });
            console.log("Database connected to localhost");
            return;
        }
        
        if (mongoose.connection.readyState === 1) {
            console.log("Database already connected");
            return;
        }
        
        await mongoose.connect(`${process.env.MONGODB_URI}/ArcaneBg`, {
            serverSelectionTimeoutMS: 5000, // 5 second timeout
            socketTimeoutMS: 45000, // 45 second timeout
            connectTimeoutMS: 10000, // 10 second timeout
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}