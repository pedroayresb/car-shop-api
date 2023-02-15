import { expect } from 'chai';
import Sinon from 'sinon';
import CarService from '../../../src/Services/Car.service';
import CarODM from '../../../src/Models/Car.model';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';

describe(('CarsService'), function () {
  let carService: CarService;
  let carODM: CarODM;
  let carModel: ICar;

  const INVALID_ERROR = 'Invalid mongo id';
  const NOT_FOUND_ERROR = 'Car not found';
  const MONGO_ID = '5ce819935e539c343f141ece';

  beforeEach(function () {
    carODM = new CarODM();
    carService = new CarService(carODM);
    carModel = {
      model: 'Ferrari',
      year: 2020,
      color: 'red',
      status: true,
      buyValue: 100000,
      doorsQty: 2,
      seatsQty: 2,
    };
  });

  afterEach(function () {
    Sinon.restore();
  });

  describe(('create'), function () {
    it(('should create a new car'), async function () {
      const carDomain = new Car(carModel);

      Sinon.stub(carODM, 'create').resolves(carModel);

      const newCar = await carService.create(carModel);

      expect(newCar).to.be.deep.equal(carDomain);
    });
  });

  describe(('getAll'), function () {
    it(('should return all cars'), async function () {
      const carDomain = new Car(carModel);

      Sinon.stub(carODM, 'getAll').resolves([carModel]);

      const cars = await carService.getAll();

      expect(cars).to.be.deep.equal([carDomain]);
    });
  });

  describe(('findById'), function () {
    it(('should not return a car with invalid id'), async function () {
      try {
        await carService.findById('123');
      } catch (error: any) {
        expect(error.message).to.be.equal(INVALID_ERROR);
      }
    });

    it(('should not return a car with not found id'), async function () {
      Sinon.stub(carODM, 'findById').resolves(null);

      try {
        await carService.findById(MONGO_ID);
      } catch (error: any) {
        expect(error.message).to.be.equal(NOT_FOUND_ERROR);
      }
    });

    it(('should return a car with valid id'), async function () {
      const carDomain = new Car(carModel);

      Sinon.stub(carODM, 'findById').resolves(carModel);

      const car = await carService.findById(MONGO_ID);

      expect(car).to.be.deep.equal(carDomain);
    });
  });

  describe(('updateById'), function () {
    it(('should not update a car with invalid id'), async function () {
      try {
        await carService.updateById('123', carModel);
      } catch (error: any) {
        expect(error.message).to.be.equal(INVALID_ERROR);
      }
    });

    it(('should not update a car with not found id'), async function () {
      Sinon.stub(carODM, 'updateById').resolves(null);

      try {
        await carService.updateById(MONGO_ID, carModel);
      } catch (error: any) {
        expect(error.message).to.be.equal(NOT_FOUND_ERROR);
      }
    });

    it(('should update a car with valid id'), async function () {
      const carDomain = new Car(carModel);

      Sinon.stub(carODM, 'updateById').resolves(carModel);

      const car = await carService.updateById(MONGO_ID, carModel);

      expect(car).to.be.deep.equal(carDomain);
    });
  });

  describe(('deleteById'), function () {
    it(('should delete a car with invalid id'), async function () {
      try {
        await carService.deleteById('123');
      } catch (error: any) {
        expect(error.message).to.be.equal(INVALID_ERROR);
      }
    });

    it(('should delete a car with not found id'), async function () {
      Sinon.stub(carODM, 'deleteById').resolves(null);

      try {
        await carService.deleteById(MONGO_ID);
      } catch (error: any) {
        expect(error.message).to.be.equal(NOT_FOUND_ERROR);
      }
    });

    it(('should delete a car with valid id'), async function () {
      const carDomain = new Car(carModel);

      Sinon.stub(carODM, 'deleteById').resolves(carModel);

      const car = await carService.deleteById(MONGO_ID);

      expect(car).to.be.deep.equal(carDomain);
    });
  });
});