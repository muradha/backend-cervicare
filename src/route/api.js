import express from 'express';
import userController from '../controller/user-controller.js';
import articleController from '../controller/article-controller.js';
import healthFacilityController from '../controller/healthFacility-controller.js';

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

export default userRouter;
