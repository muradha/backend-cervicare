import { prismaClient } from '../application/database.js';
import ResponseError from '../error/response-error.js';
import { storeHealthFacilityValidation, updateHealthFacilityValidation } from '../validation/healthFacility-validation.js';
import validate from '../validation/validation.js';

const formatTime = (time) => new Date(time).toLocaleTimeString();

const formatHealthFacility = (healthFacility) => {
  let data = healthFacility;
  if (Array.isArray(data)) {
    data = healthFacility.map((item) => {
      const newItem = { ...item }; // Create a new object or clone the item object
      newItem.openHour = formatTime(item.openHour);
      newItem.closeHour = formatTime(item.closeHour);
      return newItem;
    });
  }

  data.openHour = formatTime(data.openHour);
  data.closeHour = formatTime(data.closeHour);

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
  const healthFacility = await prismaClient.healthFacility.findMany({
    include: {
      facilityLocation: true,
    },
  });

  return formatHealthFacility(healthFacility);
};

const show = async (healthFacilityId) => {
  const healthFacility = await prismaClient.healthFacility.findUniqueOrThrow({
    where: {
      id: healthFacilityId,
    },
    include: {
      facilityLocation: true,
    },
  });
  return formatHealthFacility(healthFacility);
};

const store = async (request) => {
  const data = validate(storeHealthFacilityValidation, request);

  const uniqueName = await prismaClient.healthFacility.count({
    where: {
      name: data.name,
    },
  });

  if (uniqueName > 0) {
    throw new ResponseError(409, 'Health Facility Already Exists');
  }

  const healthFacilityData = {
    name: data.name,
    type: data.type,
    openHour: data.openHour,
    closeHour: data.closeHour,
  };

  const location = getLocationData(data);

  const healthFacility = await prismaClient.healthFacility.create({
    data: {
      ...healthFacilityData,
      facilityLocation: {
        create: location,
      },
    },
    include: {
      facilityLocation: true,
    },
  });

  return formatHealthFacility(healthFacility);
};

const update = async (request, healthFacilityId) => {
  const dataHealthFacility = validate(updateHealthFacilityValidation, request);

  const uniqueName = await prismaClient.healthFacility.count({
    where: {
      name: dataHealthFacility.name,
    },
  });

  if (uniqueName > 0) {
    throw new ResponseError(409, 'Health Facility Already Exists');
  }

  const healthFacilityData = {
    name: dataHealthFacility.name,
    type: dataHealthFacility.type,
    openHour: dataHealthFacility.openHour,
    closeHour: dataHealthFacility.closeHour,
  };

  const location = getLocationData(dataHealthFacility);

  const healthFacility = await prismaClient.healthFacility.update({
    where: {
      id: healthFacilityId,
    },
    data: {
      ...healthFacilityData,
      facilityLocation: {
        update: { data: location },
      },
    },
    include: {
      facilityLocation: true,
    },
  });

  return formatHealthFacility(healthFacility);
};

const destroy = async (healthFacilityId) => {
  const isFound = await prismaClient.healthFacility.count({
    where: {
      id: healthFacilityId,
    },
  });

  if (!isFound) {
    throw new ResponseError(404, 'Health Facility Not Found');
  }

  const healthFacility = await prismaClient.healthFacility.delete({
    where: {
      id: healthFacilityId,
    },
  });

  return formatHealthFacility(healthFacility);
};

export default {
  get,
  store,
  update,
  show,
  destroy,
};
