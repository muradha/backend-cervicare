import medicalFacilityService from '../service/medicalFacility-service.js';

const get = async (req, res, next) => {
  try {
    const result = await medicalFacilityService.get();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const { medicalFacilityId } = req.params;
    const result = await medicalFacilityService.show(medicalFacilityId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    const result = await medicalFacilityService.store(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { medicalFacilityId } = req.params;

    const result = await medicalFacilityService.update(req.body, medicalFacilityId);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { medicalFacilityId } = req.params;
    const result = await medicalFacilityService.destroy(medicalFacilityId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  get,
  show,
  store,
  update,
  destroy,
};
