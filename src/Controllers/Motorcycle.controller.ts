import { Request, Response, NextFunction } from 'express';
import { Motorcycle } from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/Motorcycle.service';

export default class MotorcycleController {
  private service: MotorcycleService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(
    req: Request,
    res: Response,
    next: NextFunction,
    service: MotorcycleService,
  ) {
    this.service = service;
    this.req = req;
    this.res = res;
    this.next = next;
  }

  public async create(): Promise<void> {
    try {
      const motorcycle: Motorcycle = this.req.body;
      const newMotorcycle = await this.service.create(motorcycle);
      this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll(): Promise<void> {
    try {
      const motorcycles = await this.service.getAll();
      this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const motorcycle = await this.service.findById(id);
      this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const motorcycle: Motorcycle = this.req.body;
      const updateMotorcycle = await this.service.updateById(id, motorcycle);
      this.res.status(200).json(updateMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const deleteMotorcycle = await this.service.deleteById(id);
      this.res.status(200).json(deleteMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}