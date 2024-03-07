import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import TeamModel from '../models/Teams.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste para rota Teams ', () => {
  it('deve retornar um array de times', async () => {
    const TeamsMock = [
      { id: 1, teamName: 'Flamengo' },
      { id: 2, teamName: 'Vasco' },
    ];

    sinon.stub(TeamModel.prototype, 'findAll').resolves(TeamsMock);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(TeamsMock);
  });

  it('deve retornar um time', async () => {
    const TeamMock = { id: 1, teamName: 'Flamengo' };

    sinon.stub(TeamModel.prototype, 'findById').resolves(TeamMock);
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(TeamMock);
  });

  it('deve retornar um erro 404', async () => {
    sinon.stub(TeamModel.prototype, 'findById').resolves(null);
    const { status } = await chai.request(app).get('/teams/666');

    expect(status).to.equal(404);
  });
});
