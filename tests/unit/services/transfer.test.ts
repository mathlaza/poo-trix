import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IPayment from '../../../src/Interfaces/IPayment';
import TransferService from '../../../src/Services/TransferService';
import Payment from '../../../src/Domain/Payment';
import PaymentStatus from '../../../src/utils/PaymentStatus';
import Key from '../../../src/Domain/Key/Key';

describe('Deveria criar uma transferência TRIX', function () {
  it('Deveria criar uma transferência TRIX com SUCESSO', async function () {
    // Arrange
    const paymentInput: IPayment = {
      payByPerson: 'Jobs',
      payToPerson: 'Wozniak',
      amount: 50000,
      key: '858.898.670-16',
    };
    const paymentOutput: Payment = new Payment(
      'Jobs',
      'Wozniak',
      50000,
      '858.898.670-16',
      '63319d80feb9f483ee823ac5',
      PaymentStatus.concluded,
    );
    const outputKey = new Key(
      '858.596.456-08',
      'Carla',
      'cpf',
      '633ec9fa3df977e30e993492',
    );
    sinon.stub(Model, 'create').resolves(paymentOutput);
    sinon.stub(Model, 'findOne').resolves(outputKey);

    // Act
    const service = new TransferService();
    const result = await service.transfer(paymentInput);

    // Assert
    expect(result).to.be.deep.equal(paymentOutput);
  });

  it('Deveria lançar uma exceção quando a key é inválida', async function () {
    // Arrange
    const paymentInput: IPayment = {
      payByPerson: 'Jobs',
      payToPerson: 'Wozniak',
      amount: 50000,
      key: '858.898.670-16XX', // 👀 observe que estamos passando um CPF inválido para capturar a exceção!
    };

    sinon.stub(Model, 'create').resolves({});
    sinon.stub(Model, 'findOne').resolves(false);

    // Act
    try {
      const service = new TransferService();
      await service.transfer(paymentInput);
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal('Key not found!');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});
