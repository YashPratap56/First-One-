import express from 'express';
import { removeBgImage } from '../controller/ImageController.js';
import { upload } from '../middleware/multer.js';
import { authUser } from '../middleware/auth.js';


export const imageRouter=express.Router();


imageRouter.post('/remove-bg',upload.single('image'),authUser,removeBgImage)
