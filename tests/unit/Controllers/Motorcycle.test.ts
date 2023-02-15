// import { expect } from 'chai';
// import Sinon from 'sinon';
// import { Request, Response, NextFunction } from 'express';
// import MotorcycleController from '../../../src/Controllers/Motorcycle.controller';
// import MotorcycleFactory from '../../../src/Factory/Motorcycle.factory';
// import MotorcycleDomain from '../../../src/Domains/Motorcycle';
// import MotorcycleService from '../../../src/Services/Motorcycle.service';

// describe(('MotorcycleController'), function () {
//   let motorcycleController: MotorcycleController;
//   let motorcycleService: MotorcycleService;
//   let motorcycleModel: MotorcycleDomain;
//   let req: Request;
//   let res: Response;
//   let next: NextFunction;

//   const SHOULD_ERROR = 'should call next when error';
//   const MONGO_ID = '5ce819935e539c343f141ece';

//   beforeEach(function () {
//     motorcycleService = MotorcycleFactory.createMotorcycleService();
//     motorcycleModel = new MotorcycleDomain({
//       model: 'Ferrari',
//       year: 2020,
//       color: 'red',
//       status: true,
//       buyValue: 100000,
//       category: 'sport',
//       engineCapacity: 1000,
//     });
//   });

//   afterEach(function () {
//     Sinon.restore();
//   });

//   describe(('create'), function () {
//     it(('should create a new motorcycle'), async function () {
//       const createStub = Sinon.stub(motorcycleService, 'create').resolves(motorcycleModel);
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {
//         body: motorcycleModel,
//       } as unknown as Request;
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       } as unknown as Response;
//       motorcycleController = new MotorcycleController(req, res, next, motorcycleService);
//       await motorcycleController.create();
//       expect(statusStub.calledWith(201)).to.be.true;
//       expect(jsonStub.calledWith(motorcycleModel)).to.be.true;
//       expect(createStub.calledOnce).to.be.true;
//     });

//     it((SHOULD_ERROR), async function () {
//       const nextStub = Sinon.stub();
//       Sinon.stub(motorcycleService, 'create').throws(new Error('Error'));
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {
//         body: motorcycleModel,
//       } as unknown as Request;
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       } as unknown as Response;
//       motorcycleController = new MotorcycleController(req, res, nextStub, motorcycleService);
//       await motorcycleController.create();
//       expect(nextStub.calledOnce).to.be.true;
//     });
//   });

//   describe(('updateById'), function () {
//     it(('should updateById a motorcycle'), async function () {
//       const updateByIdStub = Sinon.stub(motorcycleService, 'updateById').resolves(motorcycleModel);
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {
//         body: motorcycleModel,
//         params: {
//           id: MONGO_ID,
//         },
//       } as unknown as Request;
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       } as unknown as Response;
//       motorcycleController = new MotorcycleController(req, res, next, motorcycleService);
//       await motorcycleController.updateById();
//       expect(statusStub.calledWith(200)).to.be.true;
//       expect(jsonStub.calledWith(motorcycleModel)).to.be.true;
//       expect(updateByIdStub.calledOnce).to.be.true;
//     });

//     it((SHOULD_ERROR), async function () {
//       Sinon.stub(motorcycleService, 'updateById').throws(new Error('Error'));
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {
//         body: motorcycleModel,
//       };
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       };
//       const nextStub = Sinon.stub();
//       motorcycleController = new MotorcycleController(req, res, nextStub, motorcycleService);
//       await motorcycleController.updateById();
//       expect(nextStub.calledOnce).to.be.true;
//     });
//   });

//   describe(('deleteById'), function () {
//     it(('should deleteById a motorcycle'), async function () {
//       const deleteByIdStub = Sinon.stub(motorcycleService, 'deleteById').resolves(motorcycleModel);
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {
//         params: {
//           id: MONGO_ID,
//         },
//       } as unknown as Request;
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       } as unknown as Response;
//       motorcycleController = new MotorcycleController(req, res, next, motorcycleService);
//       await motorcycleController.deleteById();
//       expect(statusStub.calledWith(200)).to.be.true;
//       expect(jsonStub.calledWith(motorcycleModel)).to.be.true;
//       expect(deleteByIdStub.calledOnce).to.be.true;
//     });

//     it((SHOULD_ERROR), async function () {
//       Sinon.stub(motorcycleService, 'deleteById').throws(new Error('Error'));
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {
//         body: motorcycleModel,
//       } as unknown as Request;
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       } as unknown as Response;
//       const nextStub = Sinon.stub();
//       motorcycleController = new MotorcycleController(req, res, nextStub, motorcycleService);
//       await motorcycleController.deleteById();
//       expect(nextStub.calledOnce).to.be.true;
//     });
//   });

//   describe(('findById'), function () {
//     it(('should get a motorcycle by id'), async function () {
//       const findByIdStub = Sinon.stub(motorcycleService, 'findById').resolves(motorcycleModel);
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {
//         params: {
//           id: MONGO_ID,
//         },
//       } as unknown as Request;
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       } as unknown as Response;
//       motorcycleController = new MotorcycleController(req, res, next, motorcycleService);
//       await motorcycleController.getById();
//       expect(statusStub.calledWith(200)).to.be.true;
//       expect(jsonStub.calledWith(motorcycleModel)).to.be.true;
//       expect(findByIdStub.calledOnce).to.be.true;
//     });

//     it((SHOULD_ERROR), async function () {
//       Sinon.stub(motorcycleService, 'findById').throws(new Error('Error'));
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {
//         body: motorcycleModel,
//       } as unknown as Request;
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       } as unknown as Response;
//       const nextStub = Sinon.stub();
//       motorcycleController = new MotorcycleController(req, res, nextStub, motorcycleService);
//       await motorcycleController.getById();
//       expect(nextStub.calledOnce).to.be.true;
//     });
//   });

//   describe(('getAll'), function () {
//     it(('should get all motorcycles'), async function () {
//       const getAllStub = Sinon.stub(motorcycleService, 'getAll').resolves([motorcycleModel]);
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {} as unknown as Request;
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       } as unknown as Response;
//       motorcycleController = new MotorcycleController(req, res, next, motorcycleService);
//       await motorcycleController.getAll();
//       expect(statusStub.calledWith(200)).to.be.true;
//       expect(jsonStub.calledWith([motorcycleModel])).to.be.true;
//       expect(getAllStub.calledOnce).to.be.true;
//     });

//     it((SHOULD_ERROR), async function () {
//       Sinon.stub(motorcycleService, 'getAll').throws(new Error('Error'));
//       const statusStub = Sinon.stub().returnsThis();
//       const jsonStub = Sinon.stub().returnsThis();
//       req = {
//         body: motorcycleModel,
//       } as unknown as Request;
//       res = {
//         status: statusStub,
//         json: jsonStub,
//       } as unknown as Response;
//       const nextStub = Sinon.stub();
//       motorcycleController = new MotorcycleController(req, res, nextStub, motorcycleService);
//       await motorcycleController.getAll();
//       expect(nextStub.calledOnce).to.be.true;
//     });
//   });
// });