import connection from '../application/database.js';
import ResponseError from '../error/response-error.js';
import { storeDoctorRatingValidation } from '../validation/doctorRating-validation.js';
import validate from '../validation/validation.js';

const store = async (request, userId) => {
  const data = validate(storeDoctorRatingValidation, request);
  const [existDoctor] = await connection.execute('SELECT * FROM doctors WHERE id = ? LIMIT 1', [data.doctor_id]);

  if (existDoctor.length === 0) throw new ResponseError(404, 'Doctor Not Found');

  const [rating] = await connection.execute('INSERT INTO doctor_ratings (id, user_id, doctor_id, rating) VALUES (?, ?, ?, ?)', [
    crypto.randomUUID(),
    userId,
    data.doctor_id,
    data.rating,
  ]);

  return rating;
};

export default {
  store,
};
