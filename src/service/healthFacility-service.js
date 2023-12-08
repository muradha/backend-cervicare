import connection from '../application/database.js';
import ResponseError from '../error/response-error.js';
import { storeHealthFacilityValidation, updateHealthFacilityValidation } from '../validation/healthFacility-validation.js';
import validate from '../validation/validation.js';

const formatTime = (time) => new Date(time).toLocaleTimeString();

const formatHealthFacility = (healthFacility) => {
  let data = healthFacility;
  if (Array.isArray(data)) {
    data = healthFacility.map((item) => {
      const newItem = { ...item }; // Create a new object or clone the item object
      newItem.open_hour = formatTime(item.open_hour);
      newItem.close_hour = formatTime(item.close_hour);
      return newItem;
    });
  } else {
    data.open_hour = formatTime(data.open_hour);
    data.close_hour = formatTime(data.close_hour);
  }

  return data;
};

const getLocationData = (data) => {
  const {
    province,
    city,
    regency,
    district,
    urbanVillage,
    rural,
    address,
  } = data;

  return {
    province,
    city,
    regency,
    district,
    urbanVillage,
    rural,
    address,
  };
};

const get = async () => {
  const [healthFacility] = await connection.execute('SELECT * FROM health_facilities LIMIT 1000');

  return formatHealthFacility(healthFacility);
};

const show = async (healthFacilityId) => {
  const [healthFacilityExist] = await connection.execute('SELET COUNT(*) AS count FROM health_facilities WHERE id = ?', [healthFacilityId]);

  if (healthFacilityExist[0].count === 0) {
    throw new ResponseError(404, 'Health Facility Not Found');
  }

  const [healthFacility] = await connection.execute('SELECT * FROM health_facilities WHERE id = ?', [
    healthFacilityId,
  ]);

  return formatHealthFacility(healthFacility);
};

const store = async (request) => {
  const data = validate(storeHealthFacilityValidation, request);

  const [uniqueName] = await connection.execute('SELECT COUNT(*) FROM health_facilities WHERE name = ?', [
    data.name,
  ]);

  if (uniqueName[0].count > 0) {
    throw new ResponseError(409, 'Health Facility Already Exists');
  }

  const healthFacilityData = [
    crypto.randomUUID(),
    data.name,
    data.type,
    data.openHour,
    data.closeHour,
  ];

  // const location = getLocationData(data);

  const [healthFacility] = await connection.execute('INSERT INTO health_facilities (id,name,type,close_hour,open_hour) VALUES (?, ?, ?, ?, ?)', healthFacilityData);

  return healthFacility;
};

const update = async (request, healthFacilityId) => {
  const dataHealthFacility = validate(updateHealthFacilityValidation, request);

  const [uniqueName] = await connection.execute('SELECT COUNT(*) FROM health_facilities WHERE id = ?', [
    healthFacilityId,
  ]);

  if (uniqueName[0].count === 0) {
    throw new ResponseError(404, 'Health Facility Not Found');
  }
  const healthFacilityData = [
    dataHealthFacility.name,
    dataHealthFacility.type,
    dataHealthFacility.openHour,
    dataHealthFacility.closeHour,
    healthFacilityId,
  ];

  // const location = getLocationData(dataHealthFacility);

  const [healthFacility] = await connection.execute('UPDATE health_facilities SET name = ?, type = ?, open_hour = ?, close_hour = ? WHERE id = ?', healthFacilityData);

  return healthFacility;
};

const destroy = async (healthFacilityId) => {
  const [uniqueName] = await connection.execute('SELECT COUNT(*) FROM health_facilities WHERE id = ?', [
    healthFacilityId,
  ]);

  if (uniqueName[0].count === 0) {
    throw new ResponseError(404, 'Health Facility Not Found');
  }

  const [healthFacility] = await connection.execute('DELETE FROM health_facilities WHERE id = ?', [healthFacilityId]);

  return healthFacility;
};

const addMedicalFacility = async (healthFacilityId, medicalFacilityId) => {
  const data = await prismaClient.medicalCollaboration.create({
    data: {
      healthFacilityId,
      medicalFacilityId,
    },
  });

  return data;
};

export default {
  get,
  store,
  update,
  show,
  destroy,
  addMedicalFacility,
};
