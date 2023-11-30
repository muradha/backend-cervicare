import articleService from '../service/article-service.js';

const index = async (req, res) => {
  const result = await articleService.index();

  res.status(200).json({
    data: result,
  });
};

const store = async (req, res, next) => {
  try {
    const result = await articleService.store(req.body, req.userData);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const result = await articleService.destroy(articleId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const result = await articleService.show(articleId);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const result = await articleService.update(req.body, articleId);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  index,
  store,
  destroy,
  show,
  update,
};
