import userService from '../service/user-service.js';

const index = async (req, res, next) => {
  try {
    const result = await userService.index();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userService.show(userId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    const result = await userService.store(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await userService.destroy(userId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await userService.update(req.body, userId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  index,
  show,
  store,
  destroy,
  update,
};
