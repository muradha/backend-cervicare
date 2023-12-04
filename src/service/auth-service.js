import bcrypt from 'bcrypt';
import ResponseError from '../error/response-error.js';
import { loginUserValidation, registerUserValidation } from '../validation/user-validation.js';
import validate from '../validation/validation.js';
import { prismaClient } from '../application/database.js';

const register = async (request) => {
  const user = await validate(registerUserValidation, request);
  const userCount = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (userCount > 0) {
    throw new ResponseError(409, 'User Already Exists');
  }

  const userRole = await prismaClient.role.findFirst({
    where: {
      name: 'user',
    },
  });

  user.roleId = userRole.id;

  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const userCreated = await prismaClient.user.create({
    data: user,
  });

  return userCreated;
};

const login = async (request) => {
  const user = await validate(loginUserValidation, request);

  const userFound = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (userFound === 0) {
    throw new ResponseError(404, 'User Not Found');
  }

  const validPassword = await bcrypt.compare(user.password, userFound.password);

  if (!validPassword) {
    throw new ResponseError(401, 'Invalid Password');
  }

  return userFound;
};

export default {
  register,
  login,
};
