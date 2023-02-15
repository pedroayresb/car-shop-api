interface Car {
  model: string;
  year: number;
  color: string;
  status: boolean;
  buyValue: number;
  doorsQty: number;
  seatsQty: number;
}

interface ICars extends Car {
  id?: string;
}

export { Car, ICars };
