import publicFacilityService from '../service/publicFacility-service.js';

const get = async (req, res, next) => {
  try {
    const result = await publicFacilityService.get();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const { publicFacilityId } = req.params;
    const result = await publicFacilityService.show(publicFacilityId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    const result = await publicFacilityService.store(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { publicFacilityId } = req.params;

    const result = await publicFacilityService.update(req.body, publicFacilityId);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { publicFacilityId } = req.params;
    const result = await publicFacilityService.destroy(publicFacilityId);

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
