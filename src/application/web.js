import express from 'express';
import userRouter from '../route/api.js';
import authRouter from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import accessValidation from '../middleware/auth-middleware.js';

const web = express();

web.use(express.json());

web.use('/api', authRouter);
web.use('/api', accessValidation, userRouter);
web.use(errorMiddleware);

export default web;
