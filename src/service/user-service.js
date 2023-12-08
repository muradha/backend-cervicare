import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcrypt';
import validate from '../validation/validation.js';
import connection from '../application/database.js';
import ResponseError from '../error/response-error.js';
import { storeUserValidation, updateUserValidation } from '../validation/user-validation.js';
import uploadFile from '../utils/uploadFile.js';

const removeImage = (fileName) => {
  const dirname = path.resolve(path.dirname(''));
  const directoryPath = `${dirname}/${fileName}`;

  fs.unlink(directoryPath, (err) => {
    if (err) throw err;
  });
};

const index = async () => {
  const [rows] = await connection.query('SELECT  * FROM users LIMIT 1000;');

  return rows;
};

const show = async (userId) => {
  const [rows] = await connection.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);

  if (!rows) {
    throw new ResponseError(404, 'User Not Found');
  }

  return rows;
};

const store = async (request) => {
  const createRequest = validate(storeUserValidation, request.body);

  const [existingUser] = await connection.execute('SELECT COUNT(*) AS count FROM users WHERE email = ?', [createRequest.email]);

  if (existingUser[0].count > 0) {
    throw new ResponseError(409, 'User Already Exists');
  }

  const [roleUser] = await connection.execute('SELECT * FROM roles WHERE name = "user" LIMIT 1');

  createRequest.id = crypto.randomUUID();
  createRequest.roleId = roleUser[0].id;

  if (createRequest.password) {
    createRequest.password = await bcrypt.hash(createRequest.password, 10);
  }
  const user = await connection.execute(
    'INSERT INTO users (id,name,email,password,profile_picture,birth_date,gender,phone,role_id,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [
      createRequest.id,
      createRequest.name,
      createRequest.email,
      createRequest.password,
      createRequest.profile_picture || null,
      createRequest.birth_date || null,
      createRequest.gender || null,
      createRequest.phone || null,
      createRequest.roleId,
      new Date(),
    ],
  ).then((data) => data).catch(() => {
    throw new ResponseError(500, 'Something went wrong');
  });
};

const destroy = async (userId) => {
  const [existingUser] = await connection.execute('SELECT COUNT(*) AS count FROM users WHERE id = ?', [userId]);

  if (existingUser === 0) {
    throw new ResponseError(404, 'User Not Found');
  }

  // removeImage(userCount.profile_picture);
  const [deleteUser] = await connection.execute('DELETE FROM users WHERE id = ?', [userId]);

  return deleteUser;
};

const update = async (request, userId) => {
  const data = validate(updateUserValidation, request);

  const [existingUser] = await connection.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);

  if (!existingUser) {
    throw new ResponseError(409, 'User Not Found');
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  } else {
    data.password = existingUser[0].password;
  }
  const query = `
    UPDATE users
    SET
      name = ?,
      email = ?,
      password = ?,
      profile_picture = ?,
      birth_date = ?,
      gender = ?,
      phone = ?,
      updated_at = ?
    WHERE
      id = ?
  `;
  const values = [
    data.name,
    data.email,
    data.password,
    data.profile_picture || null,
    data.birth_date || null,
    data.gender || null,
    data.phone || null,
    new Date(),
    userId,
  ];

  try {
    const [user] = await connection.execute(query, values);
    return user;
  } catch (error) {
    throw new ResponseError(500, 'Something went wrong');
  }
};

export default {
  index,
  show,
  store,
  destroy,
  update,
};
