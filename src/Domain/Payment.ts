// Classe Payment
import PaymentStatus from '../utils/PaymentStatus';

class Payment {
  private id: string | undefined; // undefined se os dados não estiverem no banco (Ex: antes do cadastro)
  private payByPerson: string;
  private payToPerson: string;
  private amount: number;
  private key: string;
  private status: PaymentStatus;

  // Encapsulamento: Um dos pilares de POO, onde os métodos são públicos e podem ser utilizados por qualquer parte do código que instanciar um objeto desta classe, porém os atributos são privados, permitindo alterações somente por métodos de classe Payment.

  constructor(
    payByPerson: string,
    payToPerson: string,
    amount: number,
    key: string,
    id: string | undefined,
    status: PaymentStatus = 1,
  ) {
    this.id = id;
    this.payByPerson = payByPerson;
    this.payToPerson = payToPerson;
    this.amount = amount;
    this.key = key;
    this.status = status;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setPayByPerson(payByPerson: string) {
    this.payByPerson = payByPerson;
  }

  public getPayByPerson() {
    return this.payByPerson;
  }

  public setPayToPerson(payToPerson: string) {
    this.payToPerson = payToPerson;
  }

  public getPayToPerson() {
    return this.payToPerson;
  }

  public setAmount(amount: number) {
    this.amount = amount;
  }

  public getAmount() {
    return this.amount;
  }

  public setKey(key: string) {
    this.key = key;
  }

  public getKey() {
    return this.key;
  }

  public setStatus(status: PaymentStatus) {
    this.status = status;
  }

  public getStatus() {
    return this.status;
  }
}

export default Payment;
