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

const destroy = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    await doctorService.destroy(doctorId);

    res.status(200).json({
      message: 'Doctor deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    await doctorService.update(req.body, doctorId);

    res.status(200).json({
      message: 'Doctor updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  get,
  show,
  store,
  destroy,
  update,
};
