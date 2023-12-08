import connection from '../application/database.js';
import ResponseError from '../error/response-error.js';
import { storePublicFacilityValidation, updatePublicFacilityValidation } from '../validation/publicFacility-validation.js';
import validate from '../validation/validation.js';

const get = async () => {
  const [publicFacility] = await connection.execute('SELECT * FROM public_facilities LIMIT 1000');

  return publicFacility;
};

const show = async (publicFacilityId) => {
  const [publicFacility] = await connection.execute('SELECT * FROM public_facilities WHERE id = ? LIMIT 1', [publicFacilityId]);

  return publicFacility;
};

const store = async (request) => {
  const data = validate(storePublicFacilityValidation, request);

  const publicFacility = await connection.execute('INSERT INTO public_facilities (id, name) VALUES (?, ?)', [crypto.randomUUID(), data.name]);

  return publicFacility;
};

const update = async (request, publicFacilityId) => {
  const data = validate(updatePublicFacilityValidation, request);

  const [publicFacilityCount] = await connection.execute('SELECT COUNT(*) AS count FROM public_facilities', [publicFacilityId]);

  if (publicFacilityCount[0].count === 0) {
    throw new ResponseError(404, 'Medical Facility Not Found');
  }

  const [publicFacility] = await connection.execute('UPDATE public_facilities SET name = ? WHERE id = ?', [data.name, publicFacilityId]);

  return publicFacility;
};

const destroy = async (publicFacilityId) => {
  const [publicFacilityCount] = await connection.execute('SELECT COUNT(*) AS count FROM public_facilities', [publicFacilityId]);

  if (publicFacilityCount[0].count === 0) {
    throw new ResponseError(404, 'Medical Facility Not Found');
  }

  const [publicFacility] = await connection.execute('DELETE FROM public_facilities WHERE id = ?', [publicFacilityId]);

  return publicFacility;
};

export default {
  get,
  show,
  store,
  update,
  destroy,
};
