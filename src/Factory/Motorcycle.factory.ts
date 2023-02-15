import MotorcycleODM from '../Models/Motorcycle.model';
import MotorcycleService from '../Services/Motorcycle.service';

export default class MotorcycleFactory {
  public static createMotorcycleService(): MotorcycleService {
    const motorcycleODM = new MotorcycleODM();
    return new MotorcycleService(motorcycleODM);
  }
}
