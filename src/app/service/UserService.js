import bcrypt from "bcryptjs";

import db from '../../database';

export class UserService {

  async checkExistsUser({ email, password }) {

    try {

      const { rows } = await db.pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (rows.length > 0) {

        const checkPassword = bcrypt.compareSync(password, rows[0].password);

        if (!checkPassword) {
          return false;
        }

        return rows[0];
      }
      return false;
    } catch (error) {
      return false;
    }
  };
}

export default new UserService();
