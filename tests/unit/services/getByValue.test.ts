import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import Key from '../../../src/Domain/Key/Key';
import KeyService from '../../../src/Services/KeyService';

describe('Deveria buscar uma chave por valor', function () {
  it('Deveria buscar uma chave por valor com SUCESSO', async function () {
    // Arrange
    const KeyOutput = new Key(
      '+55 (18) 99765-1187',
      'Coruja',
      'phonenumber',
      '633ec9fa3df977e30e993492',
    );

    sinon.stub(Model, 'findOne').resolves(KeyOutput);

    // Act
    const service = new KeyService();
    const result = service.getByValue('+55 (18) 99765-1187');

    // Assert
    expect(result).to.be.deep.equal(KeyOutput);

    sinon.restore();
  });
});
