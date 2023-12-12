import doctorService from '../service/doctor-service.js';

const get = async (req, res, next) => {
  try {
    const result = await doctorService.get();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const result = await doctorService.show(doctorId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    await doctorService.store(req.body);

    res.status(201).json({
      message: 'Doctor created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  get,
  show,
  store,
};
