import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import userRouter from '../route/api.js';
import authRouter from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import accessValidation from '../middleware/auth-middleware.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const web = express();

web.use(cors());
web.use(limiter);
web.use(express.json()); // Used to parse JSON bodies

web.get('/', (req, res) => {
  res.send('HELLO WORLD');
});
web.use('/api', authRouter);
web.use('/api', accessValidation, userRouter);
web.use(errorMiddleware);

export default web;
