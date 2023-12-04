import { prismaClient } from '../application/database.js';
import ResponseError from '../error/response-error.js';
import { storeMedicalFacilityValidation, updateMedicalFacilityValidation } from '../validation/medicalFacility-validation.js';
import validate from '../validation/validation.js';

const get = async () => prismaClient.medicalFacility.findMany();

const show = async (medicalFacilityId) => {
  const medicalFacility = await prismaClient.medicalFacility.findUniqueOrThrow({
    where: {
      id: medicalFacilityId,
    },
  });

  return medicalFacility;
};

const store = async (request) => {
  const data = validate(storeMedicalFacilityValidation, request);

  const medicalFacility = await prismaClient.medicalFacility.create({
    data,
  });

  return medicalFacility;
}

const update = async (request, medicalFacilityId) => {
  const data = validate(updateMedicalFacilityValidation, request);

  const medicalFacilityCount = await prismaClient.medicalFacility.count({
    where: {
      id: medicalFacilityId,
    },
  });

  if (medicalFacilityCount === 0) {
    throw new ResponseError(404, 'Medical Facility Not Found');
  }

  const medicalFacility = await prismaClient.medicalFacility.update({
    where: {
      id: medicalFacilityId,
    },
    data,
  });

  return medicalFacility;
};

const destroy = async (medicalFacilityId) => {
  await prismaClient.medicalFacility.findFirstOrThrow({
    where: {
      id: medicalFacilityId,
    },
  });

  const medicalFacility = await prismaClient.medicalFacility.delete({
    where: {
      id: medicalFacilityId,
    },
  });

  return medicalFacility;
};

export default {
  get,
  show,
  store,
  update,
  destroy,
};
