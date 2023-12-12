import connection from '../application/database.js';
import { storeDoctorRatingValidation } from '../validation/doctorRating-validation.js';
import validate from '../validation/validation.js';

const store = async (request, userId) => {
  const data = validate(storeDoctorRatingValidation, request);
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
