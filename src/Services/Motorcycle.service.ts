import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/Motorcycle.model';
import { IMotorcycle } from '../Interfaces/IMotorcycle';

const INVALID_ERROR = 'Invalid mongo id';
const NOT_FOUND_ERROR = 'Motorcycle not found';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;

  constructor(odm: MotorcycleODM) {
    this.motorcycleODM = odm;
  }

  public async create(motorcycle: IMotorcycle): Promise<Motorcycle> {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    return new Motorcycle(newMotorcycle);
  }

  public async getAll(): Promise<Motorcycle[]> {
    const motorcycles = await this.motorcycleODM.getAll();
    return motorcycles.map((motorcycle) => new Motorcycle(motorcycle));
  }

  public async findById(id: string): Promise<Motorcycle | null> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const motorcycle = await this.motorcycleODM.findById(id);
    if (!motorcycle) {
      throw new Error(NOT_FOUND_ERROR);
    }

    return new Motorcycle(motorcycle);
  }

  public async updateById(
    id: string,
    motorcycle: Partial<IMotorcycle>,
  ): Promise<Motorcycle | null> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const updateMotorcycle = await this.motorcycleODM.updateById(id, motorcycle);
    if (!updateMotorcycle) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new Motorcycle(updateMotorcycle);
  }

  public async deleteById(id: string): Promise<Motorcycle | null> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_ERROR);
    }
    const motorcycle = await this.motorcycleODM.deleteById(id);
    if (!motorcycle) {
      throw new Error(NOT_FOUND_ERROR);
    }
    return new Motorcycle(motorcycle);
  }
}

export default MotorcycleService;
