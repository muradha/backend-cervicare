import { prismaClient } from '../application/database.js';
import validate from '../validation/validation.js';
import { storeArticleValidation, updateArticleValidation } from '../validation/article-validation.js';
import ResponseError from '../error/response-error.js';

const index = async () => prismaClient.article.findMany();

const store = async (request, userData) => {
  const data = validate(storeArticleValidation, request);

  const articleCount = await prismaClient.article.count({
    where: {
      title: data.title,
    },
  });

  if (articleCount > 0) {
    throw new ResponseError(409, 'Article Already Exists');
  }

  data.userId = userData.id;

  const article = await prismaClient.article.create({
    data,
  });

  return article;
};

const destroy = async (articleId) => {
  const articleCount = await prismaClient.article.count({
    where: {
      id: articleId,
    },
  });

  if (articleCount === 0) {
    throw new ResponseError(404, 'Article Not Found');
  }

  const article = await prismaClient.article.delete({
    where: {
      id: articleId,
    },
  });

  return article;
};

const show = async (articleId) => {
  const article = await prismaClient.article.findUnique({
    where: {
      id: articleId,
    },
  });

  if (!article) {
    throw new ResponseError(404, 'Article Not Found');
  }
  return article;
};

const update = async (request, articleId) => {
  const data = validate(updateArticleValidation, request);

  const articleCount = await prismaClient.article.count({
    where: {
      id: articleId,
    },
  });

  if (articleCount === 0) {
    throw new ResponseError(404, 'Article Not Found');
  }

  const article = await prismaClient.article.update({
    where: {
      id: articleId,
    },
    data,
  });

  return article;
};

export default {
  index,
  store,
  destroy,
  show,
  update,
};
