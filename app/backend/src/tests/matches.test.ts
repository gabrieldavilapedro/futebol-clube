import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../models/Matches.model';
import JWT from '../utils/JTW';
import { Response } from 'superagent';
import {
  mockAllMatches,
  mockIMatches,
  mockFMatches,
  mockMatches,
  mockGols,
} from '../tests/mocks/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste para rota Matches ', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('deve retornar um array de partidas', async () => {
    sinon.stub(MatchesModel.prototype, 'getMatches').resolves(mockAllMatches);
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockAllMatches);
  });

  it('deve retornar um array de partidas com e queryParams inProgress = true', async () => {
    sinon.stub(MatchesModel.prototype, 'getInProgressTrue').resolves(mockIMatches);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockIMatches);
  });

  it('deve retornar um array de partidas com e queryParams inProgress = false', async () => {
    sinon.stub(MatchesModel.prototype, 'getInProgressFalse').resolves(mockFMatches);
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockFMatches);
  });

  it('deve retornar a mensagem "Finished" ao finalizar uma partida', async () => {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(MatchesModel.prototype, 'getMatcheById').resolves(mockMatches as any);
    sinon.stub(MatchesModel.prototype, 'updateToFinish').resolves([1]);
    const chaiHttpResponse: Response = await chai.request(app).patch('/matches/1/finish').set('authorization', 'validToken');

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('deve retornar a mensagem "Not found this id" ao finalizar uma partida com o id errado', async () => {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(MatchesModel.prototype, 'getMatcheById').resolves(null);
    sinon.stub(MatchesModel.prototype, 'updateToFinish').resolves([0]);
    const chaiHttpResponse: Response = await chai.request(app).patch('/matches/666/finish').set('authorization', 'validToken');

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Not found this id' });
    expect(chaiHttpResponse.status).to.equal(404);
  });

  it('deve retornar a mensagem "Updated" ao atualizar os gols de uma partida', async () => {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(MatchesModel.prototype, 'getMatcheById').resolves(mockMatches as any);
    sinon.stub(MatchesModel.prototype, 'updateGolsMatch').resolves([1]);
    const chaiHttpResponse: Response = await chai.request(app).patch('/matches/1').set('authorization', 'validToken').send(mockGols);

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Updated' });
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('deve retornar a mensagem "Not found this id" ao atualizar os gols de uma partida com o id errado', async () => {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(MatchesModel.prototype, 'getMatcheById').resolves(null);
    sinon.stub(MatchesModel.prototype, 'updateGolsMatch').resolves([0]);
    const chaiHttpResponse: Response = await chai.request(app).patch('/matches/666').set('authorization', 'validToken').send(mockGols);

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Not found this id' });
    expect(chaiHttpResponse.status).to.equal(404);
  });
});