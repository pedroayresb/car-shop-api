interface Car {
  model: string;
  year: number;
  color: string;
  status: boolean;
  buyValue: number;
  doorsQty: number;
  seatsQty: number;
}

interface ICar extends Car {
  id?: string;
}
export { Car };
export default ICar;
