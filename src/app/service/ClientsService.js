import bcrypt from "bcryptjs";

import db from '../../database';

class ClientsService {
  async createClientService({ name, email, phone, location_name, coordinate_x, coordinate_y, address, number, cep }) {

    try {
      const existsUser = await this.checkExistsUserWithEmail(email);

      if (existsUser) {
        throw new Error('Email address is already in use. Please choose another.');
      }

      const clientResult = await db.pool.query(
        'INSERT INTO clients (name, email, phone, deleted) VALUES ($1, $2, $3, $4) RETURNING id',
        [name, email, phone, false]
      );

      const client_id = clientResult.rows[0].id;

      await db.pool.query(
        'INSERT INTO client_locations (client_id, location_name, coordinate_x, coordinate_y, address, number, cep, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [client_id, location_name, coordinate_x, coordinate_y, address, number, cep, false]
      );

      return {
        id: client_id,
        name,
        email,
        phone,
        created_at: new Date(),
        locations: [{
          location_name,
          coordinate_x,
          coordinate_y,
          address,
          number,
          cep
        }]
      };
    } catch (error) {
      throw error;
    }
  }

  async checkExistsUserWithEmail(email) {

    try {

      const result = await db.pool.query('SELECT email FROM clients WHERE email = $1', [email]);

      return result.rows.length > 0;

    } catch (error) {
      return false;
    }
  }


  async findAllClientsWithLocations() {

    try {

      const query = `
      SELECT
        clients.id AS client_id,
        clients.name,
        clients.email,
        clients.phone,
        clients.created_at,
        client_locations.location_name,
        client_locations.coordinate_x,
        client_locations.coordinate_y,
        client_locations.address,
        client_locations.number,
        client_locations.cep
      FROM
        clients
      LEFT JOIN
        client_locations ON clients.id = client_locations.client_id
      WHERE
      	clients.deleted = false;
    `;

      const { rows } = await db.pool.query(query);

      if (rows.length > 0) {
        const clientsWithLocations = rows.reduce((result, row) => {
          const clientId = row.client_id;

          const existingClient = result.find(client => client.id === clientId);

          if (!existingClient) {
            result.push({
              id: clientId,
              name: row.name,
              email: row.email,
              phone: row.phone,
              created_at: row.created_at,
              locations: [],
            });
          }

          if (row.location_name) {
            const location = {
              location_name: row.location_name,
              coordinate_x: row.coordinate_x,
              coordinate_y: row.coordinate_y,
              address: row.address,
              number: row.number,
              cep: row.cep,
            };
            existingClient ? existingClient.locations.push(location) : result[result.length - 1].locations.push(location);
          }

          return result;
        }, []);

        return clientsWithLocations;
      }

      throw new Error('Nenhum cliente localizado.');
    } catch (error) {
      throw error
    }
  }

  async findAllLocationsWithCliendId(clientId) {
    try {

      const [rows] = await db.pool.query(`
       SELECT
        clients.id AS client_id,
        clients.name,
        clients.email,
        clients.phone,
        clients.created_at,
        client_locations.location_name,
        client_locations.coordinate_x,
        client_locations.coordinate_y,
        client_locations.address,
        client_locations.number,
        client_locations.cep
      FROM
        clients
      LEFT JOIN
        client_locations ON clients.id = client_locations.client_id
      WHERE
      	clients.id = ?;
    `, [clientId]);

      if (rows.length > 0) {
        return rows;
      }

      throw new Error(`Nenhuma localizacao encontrada para o client_id: ${clientId}`);
    } catch (error) {
      throw error
    }
  }

  async deleteClientWithClientId(clientId) {

    try {
      const { rows } = await db.pool.query('SELECT * FROM clients WHERE id = $1', [clientId]);

      if (rows.length === 0) {
        throw new Error(`Cliente de id: ${clientId} não localizado.`);
      }

      await Promise.all([
        db.pool.query('UPDATE clients SET deleted = true WHERE id = $1', [clientId]),
        db.pool.query('UPDATE client_locations SET deleted = true WHERE client_id = $1', [clientId]),
      ]);

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default new ClientsService();
