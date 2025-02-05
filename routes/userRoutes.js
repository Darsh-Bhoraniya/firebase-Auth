import express from 'express';
import userController from '../controllers/userController.js';
import multer from 'multer'; // Multer to handle file uploads
import imageController from '../controllers/imageController.js';

const router = express.Router();
// const storage = multer.memoryStorage();

router.post('/users', userController.createUser);

router.get('/users/:userId', userController.getUserById);

router.get('/users/:userId/tokens', userController.getUserTokensByUserId);

router.patch('/users/:userId', userController.updateUser);

router.delete('/users/:userId', userController.deleteUser);

router.post('/file/upload', imageController.uploadImage);

// router.put('/update/:userId', upload.single('image'), imageController.updateImage);


export default router;
