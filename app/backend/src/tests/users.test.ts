import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../models/Users.model';
import { user } from '../tests/mocks/user';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste para rota login ', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('deve retornar um token ao fazer login', async () => {

    sinon.stub(UserModel.prototype, 'login').resolves(user);
    const { status, body } = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });

    expect(status).to.equal(200);
    expect(body).to.have.property('token');
  });

  it('deve retornar um erro ao fazer login com email ou senha em branco', async () => {
    const { status, body } = await chai.request(app).post('/login').send({});
    expect(status).to.be.eq(400);
    expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
  });

});