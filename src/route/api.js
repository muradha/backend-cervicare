import express from 'express';
import userController from '../controller/user-controller.js';
import articleController from '../controller/article-controller.js';
import healthFacilityController from '../controller/healthFacility-controller.js';
import medicalFacilityController from '../controller/medicalFacility-controller.js';
import publicFacilityController from '../controller/publicFacility-controller.js';
import uploadFile from '../utils/uploadFile.js';
import doctorController from '../controller/doctor-controller.js';
import doctorRatingController from '../controller/doctorRating-controller.js';
import authController from '../controller/auth-controller.js';

const userRouter = new express.Router();

userRouter.get('/users', userController.index);
userRouter.get('/users/:userId', userController.show);
userRouter.post('/users', uploadFile('profile_picture', 'profile_picture'), userController.store);
userRouter.delete('/users/:userId', userController.destroy);
userRouter.patch('/users/:userId', userController.update);

userRouter.post('/articles', articleController.store);
userRouter.delete('/articles/:articleId', articleController.destroy);
userRouter.patch('/articles/:articleId', articleController.update);

userRouter.get('/health-facilities/:healthFacilityId', healthFacilityController.show);
userRouter.post('/health-facilities', healthFacilityController.store);
userRouter.patch('/health-facilities/:healthFacilityId', healthFacilityController.update);
userRouter.delete('/health-facilities/:healthFacilityId', healthFacilityController.destroy);
// userRouter.post('/health-facilities/:healthFacilityId/medical-collaboration', healthFacilityController.addMedicalFacility);

userRouter.get('/medical-facilities', medicalFacilityController.get);
userRouter.get('/medical-facilities/:medicalFacilityId', medicalFacilityController.show);
userRouter.post('/medical-facilities', medicalFacilityController.store);
userRouter.patch('/medical-facilities/:medicalFacilityId', medicalFacilityController.update);
userRouter.delete('/medical-facilities/:medicalFacilityId', medicalFacilityController.destroy);

userRouter.get('/public-facilities', publicFacilityController.get);
userRouter.get('/public-facilities/:publicFacilityId', publicFacilityController.show);
userRouter.post('/public-facilities', publicFacilityController.store);
userRouter.patch('/public-facilities/:publicFacilityId', publicFacilityController.update);
userRouter.delete('/public-facilities/:publicFacilityId', publicFacilityController.destroy);

userRouter.post('/doctors', doctorController.store);
userRouter.get('/doctors/:doctorId', doctorController.show);
userRouter.delete('/doctors/:doctorId', doctorController.destroy);
userRouter.patch('/doctors/:doctorId', doctorController.update);

userRouter.post('/doctor-ratings', doctorRatingController.store);

userRouter.post('/generate-otp/whatsapp', authController.generateOtpWhatsapp);
userRouter.post('/verify-otp/whatsapp', authController.verifyOtpWhatsapp);

export default userRouter;
