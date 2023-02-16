/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import Sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
import CarController from '../../../src/Controllers/Car.controller';
import CarFactory from '../../../src/Factory/Car.factory';
import CarService from '../../../src/Services/Car.service';
import CarDomain from '../../../src/Domains/Car';

describe(('CarController'), function () {
  let carController: CarController;
  let carFactory: CarService;
  let carModel: CarDomain;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  const SHOULD_ERROR = 'should call next when error';
  const MONGO_ID = '5ce819935e539c343f141ece';

  beforeEach(function () {
    carFactory = CarFactory.createCarService();
    carModel = new CarDomain({
      model: 'Ferrari',
      year: 2020,
      color: 'red',
      status: true,
      buyValue: 100000,
      doorsQty: 2,
      seatsQty: 2,
    });
  });

  afterEach(function () {
    Sinon.restore();
  });

  describe(('create'), function () {
    it(('should create a new car'), async function () {
      const createStub = Sinon.stub(carFactory, 'create').resolves(carModel);
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {
        body: carModel,
      } as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      carController = new CarController(req, res, next, carFactory);
      await carController.create();
      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carModel)).to.be.true;
      expect(createStub.calledOnce).to.be.true;
    });

    it((SHOULD_ERROR), async function () {
      const createStub = Sinon.stub(carFactory, 'create').throws(new Error('Error'));
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {
        body: carModel,
      } as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      const nextStub = Sinon.stub();
      carController = new CarController(req, res, nextStub, carFactory);
      await carController.create();
      expect(createStub.calledOnce).to.be.true;
      expect(statusStub.notCalled).to.be.true;
      expect(jsonStub.notCalled).to.be.true;
      expect(nextStub.calledOnce).to.be.true;
    });
  });

  describe(('getAll'), function () {
    it(('should get all cars'), async function () {
      const getAllStub = Sinon.stub(carFactory, 'getAll').resolves([carModel]);
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {} as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      carController = new CarController(req, res, next, carFactory);
      await carController.getAll();
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith([carModel])).to.be.true;
      expect(getAllStub.calledOnce).to.be.true;
    });

    it((SHOULD_ERROR), async function () {
      const getAllStub = Sinon.stub(carFactory, 'getAll').throws(new Error('Error'));
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {} as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      const nextStub = Sinon.stub();
      carController = new CarController(req, res, nextStub, carFactory);
      await carController.getAll();
      expect(getAllStub.calledOnce).to.be.true;
      expect(statusStub.notCalled).to.be.true;
      expect(jsonStub.notCalled).to.be.true;
      expect(nextStub.calledOnce).to.be.true;
    });
  });

  describe(('getById'), function () {
    it(('should get a car by id'), async function () {
      const findByIdStub = Sinon.stub(carFactory, 'findById').resolves(carModel);
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {
        params: {
          id: MONGO_ID,
        },
      } as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      carController = new CarController(req, res, next, carFactory);
      await carController.getById();
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carModel)).to.be.true;
      expect(findByIdStub.calledOnce).to.be.true;
    });

    it((SHOULD_ERROR), async function () {
      const findByIdStub = Sinon.stub(carFactory, 'findById').throws(new Error('Error'));
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {
        params: {
          id: MONGO_ID,
        },
      } as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      const nextStub = Sinon.stub();
      carController = new CarController(req, res, nextStub, carFactory);
      await carController.getById();
      expect(findByIdStub.calledOnce).to.be.true;
      expect(statusStub.notCalled).to.be.true;
      expect(jsonStub.notCalled).to.be.true;
      expect(nextStub.calledOnce).to.be.true;
    });
  });

  describe(('updateById'), function () {
    it(('should updateById a car'), async function () {
      const updateByIdStub = Sinon.stub(carFactory, 'updateById').resolves(carModel);
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {
        params: {
          id: MONGO_ID,
        },
        body: carModel,
      } as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      carController = new CarController(req, res, next, carFactory);
      await carController.updateById();
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carModel)).to.be.true;
      expect(updateByIdStub.calledOnce).to.be.true;
    });

    it((SHOULD_ERROR), async function () {
      const updateByIdStub = Sinon.stub(carFactory, 'updateById').throws(new Error('Error'));
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {
        params: {
          id: MONGO_ID,
        },
        body: carModel,
      } as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      const nextStub = Sinon.stub();
      carController = new CarController(req, res, nextStub, carFactory);
      await carController.updateById();
      expect(updateByIdStub.calledOnce).to.be.true;
      expect(statusStub.notCalled).to.be.true;
      expect(jsonStub.notCalled).to.be.true;
      expect(nextStub.calledOnce).to.be.true;
    });
  });

  describe(('deleteById'), function () {
    it(('should deleteById a car'), async function () {
      const deleteByIdStub = Sinon.stub(carFactory, 'deleteById').resolves(carModel);
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {
        params: {
          id: MONGO_ID,
        },
      } as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      carController = new CarController(req, res, next, carFactory);
      await carController.deleteById();
      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carModel)).to.be.true;
      expect(deleteByIdStub.calledOnce).to.be.true;
    });

    it((SHOULD_ERROR), async function () {
      const deleteByIdStub = Sinon.stub(carFactory, 'deleteById').throws(new Error('Error'));
      const statusStub = Sinon.stub().returnsThis();
      const jsonStub = Sinon.stub().returnsThis();
      req = {
        params: {
          id: MONGO_ID,
        },
      } as unknown as Request;
      res = {
        status: statusStub,
        json: jsonStub,
      } as unknown as Response;
      const nextStub = Sinon.stub();
      carController = new CarController(req, res, nextStub, carFactory);
      await carController.deleteById();
      expect(deleteByIdStub.calledOnce).to.be.true;
      expect(statusStub.notCalled).to.be.true;
      expect(jsonStub.notCalled).to.be.true;
      expect(nextStub.calledOnce).to.be.true;
    });
  });
});
