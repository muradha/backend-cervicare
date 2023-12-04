import bcrypt from 'bcrypt';
import validate from '../validation/validation.js';
import { prismaClient } from '../application/database.js';
import ResponseError from '../error/response-error.js';
import { storeUserValidation, updateUserValidation } from '../validation/user-validation.js';

const index = async () => prismaClient.user.findMany();

const show = async (userId) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'User Not Found');
  }

  return user;
};

const store = async (request) => {
  const createRequest = validate(storeUserValidation, request);
  const userCount = await prismaClient.user.count({
    where: {
      email: createRequest.email,
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

  createRequest.roleId = userRole.id;

  if (createRequest.password) {
    createRequest.password = await bcrypt.hash(createRequest.password, 10);
  }

  const user = await prismaClient.user.create({
    data: createRequest,
  });

  if (!user) {
    throw new ResponseError(500, 'Something went wrong');
  }

  return user;
};

const destroy = async (userId) => {
  const userCount = await prismaClient.user.count({
    where: {
      id: userId,
    },
  });

  if (userCount === 0) {
    throw new ResponseError(404, 'User Not Found');
  }

  const user = await prismaClient.user.delete({
    where: {
      id: userId,
    },
  });

  return user;
};

const update = async (request, userId) => {
  const data = validate(updateUserValidation, request);

  const userCount = await prismaClient.user.count({
    where: {
      id: userId,
    },
  });

  if (userCount === 0) {
    throw new ResponseError(404, 'User Not Found');
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data,
  });

  return user;
};

export default {
  index,
  show,
  store,
  destroy,
  update,
};
