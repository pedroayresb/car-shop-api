import Automobile from './Vehicle';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class Motorcycle extends Automobile {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}