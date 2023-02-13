// Classe PaymentODM
import { Schema } from 'mongoose';
import IPayment from '../Interfaces/IPayment';
import AbstractODM from './AbstractODM';

class PaymentODM extends AbstractODM<IPayment> {
  constructor() {
    const schema = new Schema<IPayment>({
      payByPerson: { type: String, required: true },
      payToPerson: { type: String, required: true },
      amount: { type: Number, required: true },
      key: { type: String, required: true },
      status: { type: Number },
    });
    super(schema, 'Payment');
  }

  public async find(): Promise<IPayment[]> {
    const result = await this.model.find();
    return result;
  }

  public async findByKey(key: string): Promise<IPayment[]> {
    const result = await this.model.find({ key });
    return result;
  }
}

export default PaymentODM;
