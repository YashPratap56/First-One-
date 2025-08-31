import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './configs/mognoDb.js';
import { userRouter } from './routes/userRoutes.js';
import { imageRouter } from './routes/imageRoutes.js';

// app config
const PORT=process.env.PORT || 4000;
const app=express();

//initialize middleware
app.use(express.json());
app.use(cors());
app.use('/api/user',userRouter);
app.use('/api/image',imageRouter);

// Database connection with timeout and better error handling
let dbConnected = false;
const ensureDBConnection = async () => {
  if (!dbConnected) {
    try {
      // Add timeout to prevent hanging
      const connectionPromise = connectDB();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 10000)
      );
      
      await Promise.race([connectionPromise, timeoutPromise]);
      dbConnected = true;
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      // Don't throw error, just log it
      return false;
    }
  }
  return dbConnected;
};

app.get('/', async (req, res) => {
  try {
    const isConnected = await ensureDBConnection();
    if (isConnected) {
      res.send("Welcome to ArcaneBg API! Database: Connected");
    } else {
      res.send("Welcome to ArcaneBg API! Database: Disconnected");
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const isConnected = await ensureDBConnection();
    res.json({ 
      status: isConnected ? 'healthy' : 'degraded', 
      message: 'Server is running!',
      database: isConnected ? 'connected' : 'disconnected'
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// Start server immediately, don't wait for database
const startServer = async () => {
  try {
    // Start server first
    app.listen(PORT, () => {
      console.log("Server is running on port: " + PORT);
      console.log("Database connection status: Checking...");
    });
    
    // Try to connect to database in background
    setTimeout(async () => {
      try {
        await ensureDBConnection();
      } catch (error) {
        console.log("Database connection failed, but server is running");
      }
    }, 1000);
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Export for Vercel
export default app;