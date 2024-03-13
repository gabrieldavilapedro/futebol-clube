import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../models/Teams.model';
import { allTeams, team } from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;


describe('teste para rota Teams ', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('deve retornar um array de times', async () => {
    sinon.stub(TeamModel.prototype, 'findAll').resolves(allTeams);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  it('deve retornar um time', async () => {

    sinon.stub(TeamModel.prototype, 'findById').resolves(team);
    const { status, body } = await chai.request(app).get('/teams/9');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('deve retornar um erro 404', async () => {
    sinon.stub(TeamModel.prototype, 'findById').resolves(null);
    const { status } = await chai.request(app).get('/teams/666');

    expect(status).to.equal(404);
  });
});

