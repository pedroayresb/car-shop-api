import { expect } from 'chai';
import Sinon from 'sinon';
import MotorcycleService from '../../../src/Services/Motorcycle.service';
import MotorcycleODM from '../../../src/Models/Motorcycle.model';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe(('MotorcycleService'), function () {
  let motorcycleService: MotorcycleService;
  let motorcycleODM: MotorcycleODM;
  let motorcycleModel: IMotorcycle;

  const INVALID_ERROR = 'Invalid mongo id';
  const NOT_FOUND_ERROR = 'Motorcycle not found';
  const MONGO_ID = '5ce819935e539c343f141ece';

  beforeEach(function () {
    motorcycleODM = new MotorcycleODM();
    motorcycleService = new MotorcycleService(motorcycleODM);
    motorcycleModel = {
      model: 'Yamaha alguma coisa',
      year: 2020,
      color: 'red',
      status: true,
      buyValue: 100000,
      category: 'sport',
      engineCapacity: 1000,
    };
  });

  afterEach(function () {
    Sinon.restore();
  });

  describe(('create'), function () {
    it(('should create a new motorcycle'), async function () {
      const motorcycleDomain = new Motorcycle(motorcycleModel);

      Sinon.stub(motorcycleODM, 'create').resolves(motorcycleModel);

      const newMotorcycle = await motorcycleService.create(motorcycleModel);

      expect(newMotorcycle).to.be.deep.equal(motorcycleDomain);
    });
  });

  describe(('getAll'), function () {
    it(('should return all motorcycles'), async function () {
      const motorcycleDomain = new Motorcycle(motorcycleModel);

      Sinon.stub(motorcycleODM, 'getAll').resolves([motorcycleModel]);

      const motorcycles = await motorcycleService.getAll();

      expect(motorcycles).to.be.deep.equal([motorcycleDomain]);
    });
  });

  describe(('findById'), function () {
    it(('should not return a motorcycle with invalid id'), async function () {
      Sinon.stub(motorcycleODM, 'findById').resolves(null);

      try {
        await motorcycleService.findById('invalidId');
      } catch (error: any) {
        expect(error.message).to.be.equal(INVALID_ERROR);
      }
    });

    it(('should not return a motorcycle with not found id'), async function () {
      Sinon.stub(motorcycleODM, 'findById').resolves(null);

      try {
        await motorcycleService.findById(MONGO_ID);
      } catch (error: any) {
        expect(error.message).to.be.equal(NOT_FOUND_ERROR);
      }
    });

    it(('should return a motorcycle with valid id'), async function () {
      const motorcycleDomain = new Motorcycle(motorcycleModel);

      Sinon.stub(motorcycleODM, 'findById').resolves(motorcycleModel);

      const motorcycle = await motorcycleService.findById(MONGO_ID);

      expect(motorcycle).to.be.deep.equal(motorcycleDomain);
    });
  });

  describe(('updateById'), function () {
    it(('should not updateById a motorcycle with invalid id'), async function () {
      Sinon.stub(motorcycleODM, 'updateById').resolves(null);

      try {
        await motorcycleService.updateById('invalidId', motorcycleModel);
      } catch (error: any) {
        expect(error.message).to.be.equal(INVALID_ERROR);
      }
    });

    it(('should not updateById a motorcycle with not found id'), async function () {
      Sinon.stub(motorcycleODM, 'updateById').resolves(null);

      try {
        await motorcycleService.updateById(MONGO_ID, motorcycleModel);
      } catch (error: any) {
        expect(error.message).to.be.equal(NOT_FOUND_ERROR);
      }
    });

    it(('should updateById a motorcycle with valid id'), async function () {
      const motorcycleDomain = new Motorcycle(motorcycleModel);

      Sinon.stub(motorcycleODM, 'updateById').resolves(motorcycleModel);

      const motorcycle = await motorcycleService.updateById(MONGO_ID, motorcycleModel);

      expect(motorcycle).to.be.deep.equal(motorcycleDomain);
    });
  });

  describe(('deleteById'), function () {
    it(('should not deleteById a motorcycle with invalid id'), async function () {
      Sinon.stub(motorcycleODM, 'deleteById').resolves(null);

      try {
        await motorcycleService.deleteById('invalidId');
      } catch (error: any) {
        expect(error.message).to.be.equal(INVALID_ERROR);
      }
    });

    it(('should not deleteById a motorcycle with not found id'), async function () {
      Sinon.stub(motorcycleODM, 'deleteById').resolves(null);

      try {
        await motorcycleService.deleteById(MONGO_ID);
      } catch (error: any) {
        expect(error.message).to.be.equal(NOT_FOUND_ERROR);
      }
    });

    it(('should deleteById a motorcycle with valid id'), async function () {
      const motorcycleDomain = new Motorcycle(motorcycleModel);

      Sinon.stub(motorcycleODM, 'deleteById').resolves(motorcycleModel);

      const motorcycle = await motorcycleService.deleteById(MONGO_ID);

      expect(motorcycle).to.be.deep.equal(motorcycleDomain);
    });
  });
});