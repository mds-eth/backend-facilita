import { Pool } from 'pg';
import dbConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  async init() {
    try {
      this.pool = new Pool(dbConfig);

      const client = await this.pool.connect();

      console.log('\x1b[32mConnected to PostgreSQL database\x1b[0m');
      client.release();
    } catch (error) {
      console.error('\x1b[31mError connecting to PostgreSQL database\x1b[0m', error);
    }
  }
}

export default new Database();
