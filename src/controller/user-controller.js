import userService from '../service/user-service.js';

const index = async (req, res, next) => {
  try {
    const result = await userService.index();
    res.status(200).json({
      message: 'Users retrieved successfully',
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
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    await userService.store(req);
    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userService.destroy(userId);

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await userService.update(req.body, userId);
    res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  index,
  show,
  store,
  destroy,
  update,
};
