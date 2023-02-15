import { Request, Response, NextFunction } from 'express';
import { Car } from '../Interfaces/ICar';
import CarService from '../Services/Car.service';

export default class CarController {
  public service: CarService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction, service: CarService) {
    this.service = service;
    this.req = req;
    this.res = res;
    this.next = next;
  }

  public async create(): Promise<void> {
    try {
      const car: Car = this.req.body;
      const newCar = await this.service.create(car);
      this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll(): Promise<void> {
    try {
      const cars = await this.service.getAll();
      this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const car = await this.service.findById(id);
      this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const car: Car = this.req.body;
      const updateCar = await this.service.updateById(id, car);
      this.res.status(200).json(updateCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const deleteCar = await this.service.deleteById(id);
      this.res.status(200).json(deleteCar);
    } catch (error) {
      this.next(error);
    }
  }
}
