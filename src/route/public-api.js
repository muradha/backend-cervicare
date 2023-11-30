import express from 'express';
import authController from '../controller/auth-controller.js';

const authRouter = new express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default authRouter;
