// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import ResponseError from '../error/response-error.js';

dotenv.config();

const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ResponseError(401, 'Unauthorized');
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);

    req.userData = jwtDecode;
    next();
  } catch (error) {
    next(error);
  }
};

export default accessValidation;
