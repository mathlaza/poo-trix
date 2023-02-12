// Classe PaymentODM

import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
  UpdateQuery,
} from 'mongoose';
import IPayment from '../Interfaces/IPayment';

class PaymentODM {
  private schema: Schema; // Atributo para o "molde"
  private model: Model<IPayment>; // Atributo para criar coleção e fornecer acesso ao banco

  constructor() {
    this.schema = new Schema<IPayment>({
      payByPerson: { type: String, required: true },
      payToPerson: { type: String, required: true },
      amount: { type: Number, required: true },
      key: { type: String, required: true },
      status: { type: Number },
    });
    this.model = models.Payment || model('Payment', this.schema); // Antes de criar o Schema, verificar se o schema já existe. Caso não exista, o schema será criado. 
  }

  public async createDoc(payment: IPayment): Promise<IPayment> {
    const result = await this.model.create({ ...payment });
    return result;
  }

  public async find(): Promise<IPayment[]> {
    const result = await this.model.find();
    return result;
  }

  public async findByKey(key: string): Promise<IPayment[]> {
    const result = await this.model.find({ key });
    return result;
  }

  public async update(id: string, entity: Partial<IPayment>) {
    if (!isValidObjectId(id)) throw new Error('Invalid Mongo ID!');

    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...entity } as UpdateQuery<IPayment>,
      { new: true },
    );
    return result;
  }
}

export default PaymentODM;
