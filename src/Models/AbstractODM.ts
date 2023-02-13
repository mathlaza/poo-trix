import {
  isValidObjectId,
  model,
  Model,
  models,
  Schema,
  UpdateQuery,
} from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema); // Antes de criar o Schema, verificar se o schema já existe. Caso não exista, o schema será criado. 
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async update(id: string, obj: Partial<T>)
    : Promise<T | null> {
    if (!isValidObjectId(id)) throw new Error('Invalid Mongo ID!');

    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
    return result;
  }
}

export default AbstractODM;
