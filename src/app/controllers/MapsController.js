import MapsService from "../service/MapsService";

class MapsController {
  async calculateRoute(req, res) {

    const mapsService = new MapsService();

    const response = await mapsService.findShortestRoute();

    if (!response) {
      return res.status(400).json({
        status: false,
        message: "Ocorreu algum erro ao realizar calculo de distancia. Tente novamente.",
      });
    }

    return res.status(200).json({ status: true, response });
  }
}

export default new MapsController();
