import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        if (mongoose.connection.readyState === 1) {
            console.log("Database connected");
            return;
        }
        await mongoose.connect(`${process.env.MONGODB_URI}/ArcaneBg`);
        console.log("Database connected");
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}