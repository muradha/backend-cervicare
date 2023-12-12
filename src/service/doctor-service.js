import connection from '../application/database.js';
import ResponseError from '../error/response-error.js';
import { storeDoctorValidation, updateDoctorValidation } from '../validation/doctor-validation.js';
import validate from '../validation/validation.js';

const get = async () => {
  const [doctor] = await connection.execute('SELECT users.*, doctors.* FROM role_users JOIN users ON role_users.user_id = users.id JOIN doctors ON doctors.user_id = users.id WHERE role_users.role_id = "f1b51f70-9816-452c-99c6-894cd8d43482"');

  return doctor;
};

const show = async (doctorId) => {
  const [existDoctor] = await connection.execute('SELECT * FROM doctors WHERE id = ? LIMIT  1', [doctorId]);

  if (existDoctor.length === 0) throw new Error('Doctor Not Found');

  const [doctor] = await connection.execute('SELECT users.*, doctors.* FROM role_users JOIN users ON role_users.user_id = users.id JOIN doctors ON doctors.user_id = users.id WHERE doctors.id = ?', [doctorId]);

  return doctor;
};

const store = async (request) => {
  const data = await validate(storeDoctorValidation, request);
  const [existUser] = await connection.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [data.user_id]);

  if (existUser.length === 0) throw new ResponseError(404, 'User Not Found');

  const [uniqueDoctor] = await connection.execute('SELECT * FROM doctors WHERE user_id = ? LIMIT 1', [data.user_id]);

  if (uniqueDoctor.length > 0) throw new ResponseError(409, 'Doctor Already Exist');

  const [doctor] = await connection.execute('INSERT INTO doctors (id, registration_certificate, work_lifetime, practice_location, alumnus, user_id) VALUES (?, ?, ?, ?, ?, ?)', [
    crypto.randomUUID(),
    data.registration_certificate,
    data.work_lifetime,
    data.practice_location,
    data.alumnus,
    data.user_id,
  ]);

  return doctor;
};

const destroy = async (doctorId) => {
  const [uniqueDoctor] = await connection.execute('SELECT * FROM doctors WHERE id = ? LIMIT 1', [doctorId]);

  if (uniqueDoctor.length === 0) throw new ResponseError(404, 'Doctor Not Found');

  const [result] = await connection.execute('DELETE FROM doctors WHERE id = ?', [doctorId]);

  return result;
};

const update = async (request, doctorId) => {
  const data = validate(updateDoctorValidation, request);
  const [uniqueDoctor] = await connection.execute('SELECT * FROM doctors WHERE id = ? LIMIT 1', [doctorId]);

  if (uniqueDoctor.length === 0) throw new ResponseError(404, 'Doctor Not Found');

  const [result] = await connection.execute('UPDATE doctors SET registration_certificate = ?, work_lifetime = ?, practice_location = ?, alumnus = ? WHERE id = ?', [
    data.registration_certificate,
    data.work_lifetime,
    data.practice_location,
    data.alumnus,
    doctorId,
  ]);

  return result;
};

export default {
  get,
  show,
  store,
  destroy,
  update,
};
