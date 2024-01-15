import ClientsService from './ClientsService';

export class MapsService {

  constructor() {
    this.shortestRoute = [];
    this.shortestDistance = Infinity;
  }

  calculateDistance(city1, city2) {
    const deltaX = city1.coordinate_x - city2.coordinate_x;
    const deltaY = city1.coordinate_y - city2.coordinate_y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  };

  async calculateTotalDistance(route) {

    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += this.calculateDistance(route[i], route[i + 1]);
    }

    return totalDistance;
  }

  async findShortestRoute() {

    const clients = await ClientsService.findAllClientsWithLocations();

    const locations = clients.map(client => client.locations).flat();

    await this.permute(locations);

    const total = await this.calculateTotalDistance(this.shortestRoute);

    const data = {
      total: total.toFixed(2),
      locations: this.shortestRoute
    }

    return data;
  }

  async permute(arr, start = 0) {
    return new Promise(async (resolve) => {
      if (start === arr.length - 1) {
        const currentDistance = await this.calculateTotalDistance(arr);

        if (currentDistance < this.shortestDistance) {
          this.shortestDistance = currentDistance;
          this.shortestRoute = [...arr];
        }

        resolve(this.shortestRoute);
      } else {
        for (let i = start; i < arr.length; i++) {
          [arr[start], arr[i]] = [arr[i], arr[start]];
          await this.permute([...arr], start + 1);
          [arr[start], arr[i]] = [arr[i], arr[start]];
        }

        resolve(this.shortestRoute);
      }
    });
  }
}

export default MapsService;
