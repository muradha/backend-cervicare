import express from 'express';
import userController from '../controller/user-controller.js';

const userRouter = new express.Router();

userRouter.get('/users', userController.index);
userRouter.get('/users/:userId', userController.show);
userRouter.post('/users', userController.store);
userRouter.delete('/users/:userId', userController.destroy);
userRouter.patch('/users/:userId', userController.update);

export default userRouter;
