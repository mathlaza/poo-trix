import Payment from '../Domain/Payment';
import IPayment from '../Interfaces/IPayment';
import PaymentODM from '../Models/PaymentODM';

class TransferService {
  private isValidKey(key: string): boolean {
    const cpfRegex = /^\d{3}.\d{3}.\d{3}-\d{2}$/; // Formato CPF válido.
    return cpfRegex.test(key);
  }

  private createPaymentDomain(payment: IPayment | null): Payment | null {
    if (payment) {
      return new Payment(
        payment.payByPerson,
        payment.payToPerson,
        payment.amount,
        payment.key,
        payment.id,
        payment.status,
      );
    }
    return null;
  }

  public async transfer(payment: IPayment) {
    if (!this.isValidKey(payment.key)) throw new Error('Invalid Key!');
    // Criar instância da Model de Payment usando Mongoose
    const paymentODM = new PaymentODM();
    // Inserir os dados no banco
    const newPayment = await paymentODM.createDoc(payment);
    // Retornar os dados com o id
    return this.createPaymentDomain(newPayment);
  }

  public async getAllTransfers() {
    const paymentODM = new PaymentODM();
    const payments = await paymentODM.find();
    const paymentArray = payments.map((payment) =>
      this.createPaymentDomain(payment));
    return paymentArray;
  }

  public async getByKey(key: string) {
    const paymentODM = new PaymentODM();
    const payments = await paymentODM.findByKey(key);
    const paymentArray = payments
      .map((payment) => this.createPaymentDomain(payment));
    return paymentArray;
  }

  public async undoTransfer(id: string, payment: IPayment) {
    if (!this.isValidKey(payment.key)) throw new Error('Invalid Key!');

    const paymentODM = new PaymentODM();
    const result = await paymentODM.update(id, payment);
    return result;
  }
}

export default TransferService;
