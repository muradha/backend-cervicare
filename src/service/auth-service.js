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
