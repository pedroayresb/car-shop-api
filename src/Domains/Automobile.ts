import IAutomobile from '../Interfaces/IAutomobile';

export default class Automobile {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;

  constructor(automobile: IAutomobile) {
    this.id = automobile.id;
    this.model = automobile.model;
    this.year = automobile.year;
    this.color = automobile.color;
    this.status = automobile.status;
    this.buyValue = automobile.buyValue;
  }
}
