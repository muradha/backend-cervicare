import express from 'express';
import userController from '../controller/user-controller.js';
import articleController from '../controller/article-controller.js';
import healthFacilityController from '../controller/healthFacility-controller.js';
import medicalFacilityController from '../controller/medicalFacility-controller.js';

const userRouter = new express.Router();

userRouter.get('/users', userController.index);
userRouter.get('/users/:userId', userController.show);
userRouter.post('/users', userController.store);
userRouter.delete('/users/:userId', userController.destroy);
userRouter.patch('/users/:userId', userController.update);

userRouter.get('/articles', articleController.index);
userRouter.get('/articles/:articleId', articleController.show);
userRouter.post('/articles', articleController.store);
userRouter.delete('/articles/:articleId', articleController.destroy);
userRouter.patch('/articles/:articleId', articleController.update);

userRouter.get('/health-facilities', healthFacilityController.get);
userRouter.get('/health-facilities/:healthFacilityId', healthFacilityController.show);
userRouter.post('/health-facilities', healthFacilityController.store);
userRouter.patch('/health-facilities/:healthFacilityId', healthFacilityController.update);
userRouter.delete('/health-facilities/:healthFacilityId', healthFacilityController.destroy);
userRouter.post('/health-facilities/:healthFacilityId/medical-collaboration', healthFacilityController.addMedicalFacility);

userRouter.get('/medical-facilities', medicalFacilityController.get);
userRouter.get('/medical-facilities/:medicalFacilityId', medicalFacilityController.show);
userRouter.post('/medical-facilities', medicalFacilityController.store);
userRouter.patch('/medical-facilities/:medicalFacilityId', medicalFacilityController.update);
userRouter.delete('/medical-facilities/:medicalFacilityId', medicalFacilityController.destroy);

export default userRouter;
