import { Router } from 'express';
import CarController from '../Controllers/Car.controller';
import CarFactory from '../Factory/Car.factory';

const router = Router();

const carService = CarFactory.createCarService();

router
  .post('/', (req, res, next) => new CarController(req, res, next, carService).create())
  .get('/', (req, res, next) => new CarController(req, res, next, carService).getAll())
  .get('/:id', (req, res, next) => new CarController(req, res, next, carService).getById())
  .put('/:id', (req, res, next) => new CarController(req, res, next, carService).updateById())
  .delete('/:id', (req, res, next) => new CarController(req, res, next, carService).deleteById());

export default router;
