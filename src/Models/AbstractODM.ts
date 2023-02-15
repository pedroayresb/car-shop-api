import {
  model,
  Model,
  models,
  Schema,
} from 'mongoose';

abstract class AbstractODM<T> {
  protected schema: Schema;
  protected modelName: string;
  protected model: Model<T>;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[modelName] || model(modelName, schema);
  }

  public async create(data: T): Promise<T> {
    return this.model.create(data);
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async updateById(id: string, data: Partial<T>): Promise<T | null> {
    const updateVehicle = this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updateVehicle;
  }

  public async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}

export default AbstractODM;
