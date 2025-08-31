import express from 'express';
import { clerkWebhooks, userCredits } from '../controller/userController.js';
import { authUser } from '../middleware/auth.js';

export const userRouter=express.Router();


userRouter.post('/webhooks',clerkWebhooks);
userRouter.get('/credits',authUser,userCredits);

