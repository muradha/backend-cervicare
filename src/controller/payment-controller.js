import paymentService from '../service/payment-service.js';

const get = async (req, res, next) => {
  try {
    const result = await paymentService.get();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await paymentService.create(req);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const callback = async (req, res, next) => {
  try {
    const result = await paymentService.callback(req);
    res.status(200).json({
      data: result,
    });
  }
  catch (error) {
    next(error);
  }
}

export default {
  get,
  create,
  callback,
};
