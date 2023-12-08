import connection from '../application/database.js';
import validate from '../validation/validation.js';
import { storeArticleValidation, updateArticleValidation } from '../validation/article-validation.js';
import ResponseError from '../error/response-error.js';

const index = async () => {
  const [rows] = await connection.query('SELECT  * FROM articles LIMIT 1000;');

  return rows;
};

const store = async (request, userData) => {
  const data = validate(storeArticleValidation, request);

  const [articleCount] = await connection.execute('SELECT COUNT(*) AS count FROM articles WHERE title = ?', [
    data.title,
  ]);

  if (articleCount[0].count > 0) {
    throw new ResponseError(409, 'Article Already Exists');
  }

  data.id = crypto.randomUUID();
  data.userId = userData.id;

  const query = 'INSERT INTO articles (id, title, content, user_id, updated_at) VALUES (?, ?, ?, ?, ?)';
  const values = [
    data.id,
    data.title,
    data.content,
    data.userId,
    new Date(),
  ];

  try {
    const [article] = await connection.execute(query, values);
    return article;
  } catch (error) {
    throw new ResponseError(500, 'Internal Server Error');
  }
};

const destroy = async (articleId) => {
  const [articleCount] = await connection.execute('SELECT COUNT(*) AS count FROM articles WHERE id = ?', [
    articleId,
  ]);

  if (articleCount[0].count === 0) {
    throw new ResponseError(404, 'Article Not Found');
  }

  const article = await connection.execute('DELETE FROM articles WHERE id = ?', [
    articleId,
  ]);

  return article;
};

const show = async (articleId) => {
  const [article] = await connection.execute('SELECT * FROM articles WHERE id = ?', [
    articleId,
  ]);

  if (article.length === 0) {
    throw new ResponseError(404, 'Article Not Found');
  }
  return article;
};

const update = async (request, articleId) => {
  const data = validate(updateArticleValidation, request);

  const [articleCount] = await connection.execute('SELECT COUNT(*) AS count FROM articles WHERE id = ?', [
    articleId,
  ]);

  if (articleCount[0].count === 0) {
    throw new ResponseError(404, 'Article Not Found');
  }

  const article = await connection.execute('UPDATE articles SET title = ?, content = ?, updated_at = ? WHERE id = ?', [
    data.title,
    data.content,
    new Date(),
    articleId,
  ]);

  return article;
};

export default {
  index,
  store,
  destroy,
  show,
  update,
};
