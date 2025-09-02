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
// Database connection with error handling
let dbConnected = false;
const ensureDBConnection = async () => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }
};

app.get('/', async (req, res) => {
  try {
    await ensureDBConnection();
    res.send("Welcome to ArcaneBg API!");
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await ensureDBConnection();
    res.json({ status: 'healthy', message: 'Server is running!' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// Connect to database first, then start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT,()=>{
        console.log("the server is running hot on port:-"+PORT)
    })
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Export for Vercel
export default app;