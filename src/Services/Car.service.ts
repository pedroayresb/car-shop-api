import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import CarODM from '../Models/Car.model';
import { ICars } from '../Interfaces/ICar';

const INVALID_ERROR = 'Invalid mongo id';
const NOT_FOUND_ERROR = 'Car not found';

class CarService {
  private carODM: CarODM;

  constructor(odm: CarODM) {
    this.carODM = odm;
  }

  public async create(car: ICars): Promise<Car> {
    const newCar = await this.carODM.create(car);
    return new Car(newCar);
  }

  public async getAll(): Promise<Car[]> {
    const cars = await this.carODM.getAll();
    return cars.map((car) => new Car(car));
  }

  public async findById(id: string): Promise<Car | null> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const car = await this.carODM.findById(id);
    if (!car) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new Car(car);
  }

  public async updateById(id: string, car: Partial<ICars>): Promise<Car | null> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const updateCar = await this.carODM.updateById(id, car);
    if (!updateCar) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new Car(updateCar);
  }

  public async deleteById(id: string): Promise<Car | null> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const car = await this.carODM.deleteById(id);
    if (!car) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new Car(car);
  }
}

export default CarService;
