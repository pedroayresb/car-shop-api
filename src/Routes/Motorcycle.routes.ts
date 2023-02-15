import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';
import MotorcycleFactory from '../Factory/Motorcycle.factory';

const router = Router();

const motorcycleService = MotorcycleFactory.createMotorcycleService();

router
  .post(
    '/',
    (req, res, next) => new MotorcycleController(req, res, next, motorcycleService).create(),
  )
  .get(
    '/',
    (req, res, next) => new MotorcycleController(req, res, next, motorcycleService).getAll(),
  )
  .get(
    '/:id',
    (req, res, next) => new MotorcycleController(req, res, next, motorcycleService).getById(),
  )
  .put(
    '/:id',
    (req, res, next) => new MotorcycleController(req, res, next, motorcycleService).updateById(),
  )
  .delete(
    '/:id',
    (req, res, next) => new MotorcycleController(req, res, next, motorcycleService).deleteById(),
  );

export default router;
