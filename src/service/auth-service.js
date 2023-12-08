import bcrypt from 'bcrypt';
import ResponseError from '../error/response-error.js';
import { loginUserValidation, registerUserValidation } from '../validation/user-validation.js';
import validate from '../validation/validation.js';
import connection from '../application/database.js';

const register = async (request) => {
  const user = await validate(registerUserValidation, request);
  const [userCount] = await connection.execute('SELECT COUNT(*) as count FROM users WHERE email = ?', [user.email]);

  if (userCount[0].count > 0) {
    throw new ResponseError(409, 'User Already Exists');
  }

  const [userRole] = await connection.execute('SELECT * FROM roles WHERE name = ?', ['user']);
  user.roleId = userRole[0].id;

  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const userCreated = await connection.execute('INSERT INTO users (id,name,email,password,role_id,updated_at) VALUES (?, ?, ?, ?, ?, ?)', [
    crypto.randomUUID(),
    user.name,
    user.email,
    user.password,
    user.roleId,
    new Date(),
  ]);

  return userCreated;
};

const login = async (request) => {
  const user = await validate(loginUserValidation, request);

  const [userFound] = await connection.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [user.email]);

  if (userFound.length === 0) {
    throw new ResponseError(404, 'User Not Found');
  }

  const validPassword = await bcrypt.compare(user.password, userFound[0].password);

  if (!validPassword) {
    throw new ResponseError(401, 'Invalid Password');
  }

  return userFound;
};

export default {
  register,
  login,
};
