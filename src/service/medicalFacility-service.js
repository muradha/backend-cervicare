import connection from '../application/database.js';
import ResponseError from '../error/response-error.js';
import { storeMedicalFacilityValidation, updateMedicalFacilityValidation } from '../validation/medicalFacility-validation.js';
import validate from '../validation/validation.js';

const get = async () => {
  const [medicalFacility] = await connection.execute('SELECT * FROM medical_facilities LIMIT 1000');

  return medicalFacility;
};

const show = async (medicalFacilityId) => {
  const [medicalFacilityCount] = await connection.execute('SELECT COUNT(*) AS count FROM medical_facilities WHERE id = ?', [medicalFacilityId]);

  if (medicalFacilityCount[0].count === 0) {
    throw new ResponseError(409, 'Medical Facility Not Found');
  }

  const [medicalFacility] = await connection.execute('SELECT * FROM medical_facilities WHERE id = ?', [medicalFacilityId]);

  return medicalFacility;
};

const store = async (request) => {
  const data = validate(storeMedicalFacilityValidation, request);

  const [medicalFacilityCount] = await connection.execute('SELECT COUNT(*) AS count FROM medical_facilities WHERE name = ?', [data.name]);

  if (medicalFacilityCount[0].count > 1) {
    throw new ResponseError(409, 'Medical Facility Already Exists');
  }

  const medicalFacility = await connection.execute('INSERT INTO medical_facilities (id, name) VALUES (?, ?)', [
    crypto.randomUUID(),
    data.name,
  ]);

  return medicalFacility;
};

const update = async (request, medicalFacilityId) => {
  const data = validate(updateMedicalFacilityValidation, request);

  const [medicalFacilityCount] = await connection.execute('SELECT COUNT(*) AS count FROM medical_facilities WHERE id = ?', [medicalFacilityId]);

  if (medicalFacilityCount[0].count > 1) {
    throw new ResponseError(409, 'Medical Facility Already Exists');
  }

  const [medicalFacility] = await connection.execute('UPDATE medical_facilities SET name = ?', [data.name]);

  return medicalFacility;
};

const destroy = async (medicalFacilityId) => {
  const [medicalFacilityCount] = await connection.execute('SELECT COUNT(*) AS count FROM medical_facilities WHERE id = ?', [medicalFacilityId]);

  if (medicalFacilityCount[0].count === 0) {
    throw new ResponseError(404, 'Medical Facility Not Found');
  }

  const [medicalFacility] = await connection.execute('DELETE FROM medical_facilities WHERE id = ?', [medicalFacilityId]);

  return medicalFacility;
};

export default {
  get,
  show,
  store,
  update,
  destroy,
};
