import Car from '../Models/Car.model';
import CarService from '../Services/Car.service';

export default class CarFactory {
  public static createCarService(): CarService {
    const carODM = new Car();
    return new CarService(carODM);
  }
}
