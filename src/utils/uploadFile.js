// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
import path from 'path';
import fs from 'node:fs';
import ResponseError from '../error/response-error.js';

const imageFilter = async (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { // allowed file extensions
    return cb(new Error('please upload png,jpeg or jpg'));
  }
  return cb(null, true);
};

const uploadFile = (inputFieldName, pathName = '') => {
  const dir = `uploads/${pathName}`;
  try {
    fs.access(dir, (err) => {
      if (err) throw err;
      fs.mkdir(dir, { recursive: true }, (error) => {
        if (error) throw error;
      });
    });

    const storage = multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now() + Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
      },
    });

    const upload = multer({
      storage,
      fileFilter: imageFilter,
    });
    return upload.single(inputFieldName);
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

export default uploadFile;
