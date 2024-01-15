import ClientsService from "../service/ClientsService";

class ClientsController {
  async create(req, res) {

    const { name, email, phone, location_name, coordinate_x, coordinate_y, address, number, cep } = req.body;

    const response = await ClientsService.createClientService({ name, email, phone, location_name, coordinate_x, coordinate_y, address, number, cep });

    if (!response) {
      return res.status(400).json({
        status: false,
        message: "Dados não localizados para o usuário informado.",
      });
    }

    return res.status(201).json({ status: true, response });
  }

  async findAll(req, res) {

    const response = await ClientsService.findAllClientsWithLocations();

    if (!response) {
      return res.status(400).json({
        status: false,
        message: "Ocorreu algum erro ao realizar busca. Tente novamente.",
      });
    }

    return res.status(200).json({ status: true, response });
  }

  async findOne(req, res) {

    const { clientId } = req.params;

    const response = await ClientsService.findAllLocationsWithCliendId(clientId);

    if (!response) {
      return res.status(400).json({
        status: false,
        message: "Ocorreu algum erro ao realizar busca. Tente novamente.",
      });
    }

    return res.status(200).json({ status: true, response });
  }

  async delete(req, res) {

    const { clientId } = req.params;

    const response = await ClientsService.deleteClientWithClientId(clientId);

    if (!response) {
      return res.status(400).json({
        status: false,
        message: "Ocorreu algum erro ao tentar excluir cliente. Tente novamente.",
      });
    }

    return res.status(204).json();
  }
}

export default new ClientsController();
