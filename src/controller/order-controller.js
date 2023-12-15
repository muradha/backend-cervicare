import orderService from '../service/order-service.js';

const store = async (req, res, next) => {
  try {
    await orderService.store(req.body);

    res.status(201).json({
      message: 'Order created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  store,
};
