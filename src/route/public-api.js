import express from 'express';
import authController from '../controller/auth-controller.js';
import articleController from '../controller/article-controller.js';
import healthFacilityController from '../controller/healthFacility-controller.js';
import doctorController from '../controller/doctor-controller.js';
import paymentController from '../controller/payment-controller.js';

const publicRouter = new express.Router();

publicRouter.post('/register', authController.register);
publicRouter.post('/login', authController.login);

publicRouter.get('/articles', articleController.index);
publicRouter.get('/articles/:articleId', articleController.show);

publicRouter.get('/doctors', doctorController.get);
publicRouter.get('/doctors/:doctorId', doctorController.show);

publicRouter.get('/health-facilities', healthFacilityController.get);
publicRouter.get('/health-facilities/:healthFacilityId', healthFacilityController.show);

publicRouter.post('/payments/callback', paymentController.callback);
publicRouter.post('/payments/check', paymentController.check);

export default publicRouter;
