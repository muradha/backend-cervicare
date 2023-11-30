import express from 'express';
import userController from '../controller/user-controller.js';
import articleController from '../controller/article-controller.js';

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

export default userRouter;
