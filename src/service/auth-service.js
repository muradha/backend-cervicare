import bcrypt from 'bcrypt';
import superagent from 'superagent';
import dotenv from 'dotenv';
import ResponseError from '../error/response-error.js';
import { loginUserValidation, registerUserValidation } from '../validation/user-validation.js';
import validate from '../validation/validation.js';
import connection from '../application/database.js';
import Joi from 'joi';

dotenv.config();

const register = async (request) => {
  const user = await validate(registerUserValidation, request);
  const [userCount] = await connection.execute('SELECT COUNT(*) as count FROM users WHERE email = ?', [user.email]);
  if (userCount[0].count > 0) {
    throw new ResponseError(409, 'User Already Exists');
  }

  const [role] = await connection.execute('SELECT * FROM roles WHERE name = ?', ['user']);
  user.roleId = role[0].id;

  user.password = await bcrypt.hash(user.password, 10);

  user.id = crypto.randomUUID();

  const [userCreated] = await connection.execute('INSERT INTO users (id,name,email,password,updated_at) VALUES (?, ?, ?, ?, ?)', [
    user.id,
    user.name,
    user.email,
    user.password,
    new Date(),
  ]);

  const userRole = await connection.execute('INSERT INTO role_users(role_id, user_id) VALUES(?, ?)', [user.roleId, user.id]);

  return userCreated;
};

const login = async (request) => {
  const user = await validate(loginUserValidation, request);

  const [userFound] = await connection.execute('SELECT id,name,email,gender,password FROM users WHERE email = ? LIMIT 1', [user.email]);

  if (userFound.length === 0) {
    throw new ResponseError(404, 'User Not Found');
  }

  const validPassword = await bcrypt.compare(user.password, userFound[0].password);

  if (!validPassword) {
    throw new ResponseError(401, 'Invalid Password');
  }

  return userFound;
};

const generateOtpWhatsapp = async (request) => {
  const data = validate(Joi.object({
    phone_number: Joi.string().min(10).required(),
  }), request.body);

  const userId = request.userData.id;
  const [existingUser] = await connection.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);

  if (existingUser.length === 0) throw new ResponseError(404, 'User Not Found');

  const apiUrl = process.env.FONNTE_API_URL;
  const apiKey = process.env.FONNTE_API_KEY;

  const existWhatsapp = await superagent.post(`${apiUrl}/validate`).set('Authorization', apiKey).send({
    target: data.phone_number,
  });

  if (existWhatsapp.body.not_registered.length > 0) {
    throw new ResponseError(400, 'Whatsapp Number Not Registered');
  }

  const randomOtp = Math.floor(100000 + Math.random() * 900000);
  const sendOtp = await superagent.post(`${apiUrl}/send`).set('Authorization', apiKey).send({
    target: data.phone_number,
    message: `Your OTP is ${randomOtp}`,
  });
  const result = sendOtp.body;

  const expiryTime = Date.now() + (1000 * 60); // 1 minutes

  const otp = await connection.execute('INSERT INTO user_otp (id, otp, expiry_time, user_id) VALUES (?,?,?,?)', [crypto.randomUUID(), randomOtp, expiryTime, userId]);

  return result;
};

const verifyOtpWhatsapp = async (data) => {
  const { body: { otp_code: otpCode }, userData: { id: userId } } = data;

  const [existingOtp] = await connection.execute(
    'SELECT * FROM user_otp WHERE otp = ? AND user_id = ? AND is_verified = "NO" LIMIT 1',
    [otpCode, userId],
  );

  if (existingOtp.length === 0) {
    throw new ResponseError(401, 'Invalid OTP');
  }

  const currentTime = Date.now();

  if (currentTime > existingOtp[0].expiry_time) {
    throw new ResponseError(401, 'OTP Expired');
  }

  const [updateOtp] = await connection.execute(
    'UPDATE user_otp SET is_verified = "YES", updated_at = ? WHERE id = ?',
    [new Date(), existingOtp[0].id],
  );

  return updateOtp;
};

export default {
  register,
  login,
  generateOtpWhatsapp,
  verifyOtpWhatsapp,
};
