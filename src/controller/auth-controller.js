import jwt from 'jsonwebtoken';
import authService from '../service/auth-service.js';

const register = async (req, res, next) => {
  try {
    await authService.register(req.body);
    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    const payload = {
      id: result[0].id,
      email: result[0].email,
    };

    const secret = process.env.JWT_SECRET;
    // 60 seconds * 60 seconds * 1 = 1 hours
    const expiresIn = 60 * 60 * 24 * 7;
    const token = jwt.sign(payload, secret, { expiresIn });

    res.status(200).json({
      data: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
