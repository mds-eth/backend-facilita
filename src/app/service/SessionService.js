import jwt from 'jsonwebtoken';

import UserService from './UserService';

import authConfig from '../../config/auth.config';

export class SessionService {

  async createSessionService({ email, password }) {

    try {

      const existsUsers = await UserService.checkExistsUser({ email, password });

      if (!existsUsers) {
        throw new Error('Nao foi possivel criar sessao. Tente novamente.');
      }

      const session = {
        name: existsUsers.name,
        email: existsUsers.email
      }

      return jwt.sign({ session }, authConfig.secret, { expiresIn: authConfig.expiresIn });
    } catch (error) {
      throw error;
    }
  };
}

export default new SessionService();
