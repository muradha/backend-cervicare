import doctorRatingService from '../service/doctorRating-service.js';

const store = async (req, res, next) => {
  try {
    const userId = req.userData.id;
    await doctorRatingService.store(req.body, userId);

    res.status(201).json({
      message: 'Doctor rating created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  store,
};
