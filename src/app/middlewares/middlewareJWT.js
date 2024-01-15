import jwt from 'jsonwebtoken';

import { promisify } from 'util';
import authConfig from '../../config/auth.config';

export default async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: false, message: 'Não autorizado.' });
  }
  try {

    const response = await promisify(jwt.verify)(authHeader, authConfig.secret);

    return next();
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Não autorizado.' });
  }
}