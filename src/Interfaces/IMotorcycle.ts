interface Motorcycle {
  model: string;
  year: number;
  color: string;
  status?: boolean | undefined;
  buyValue: number;
  category: string;
  engineCapacity: number;
}

interface IMotorcycle extends Motorcycle {
  id?: string;
}
export { Motorcycle };
export default IMotorcycle;
