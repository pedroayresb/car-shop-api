import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const carSchema = new Schema({
      model: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        required: false,
        default: false,
      },
      buyValue: {
        type: Number,
        required: true,
      },
      doorsQty: {
        type: Number,
        required: true,
      },
      seatsQty: {
        type: Number,
        required: true,
      },
    });

    super(carSchema, 'Car');
  }
}

export default CarODM;
