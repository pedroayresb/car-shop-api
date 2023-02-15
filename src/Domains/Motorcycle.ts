import Automobile from './Automobile';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class Motorcycle extends Automobile {
  protected category: string;
  protected engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}