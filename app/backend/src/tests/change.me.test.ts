import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../models/Teams.model';
import UserModel from '../models/Users.model';
import MatchesModel from '../models/Matches.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('testes ', () => {
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
  describe('teste para rota login ', () => {
    it('deve retornar um token', async () => {

      const userMock = {
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      }

      sinon.stub(UserModel.prototype, 'login').resolves(userMock);
      const { status, body } = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });

      expect(status).to.equal(200);
      expect(body).to.have.property('token');
    });

  });
  describe('teste para rota Matches ', () => {
    it('deve retornar um array de partidas', async () => {
      const MatchesMock =
        [
          {
            "id": 1,
            "homeTeamId": 16,
            "homeTeamGoals": 1,
            "awayTeamId": 8,
            "awayTeamGoals": 1,
            "inProgress": false,
            "homeTeam": {
              "teamName": "São Paulo"
            },
            "awayTeam": {
              "teamName": "Grêmio"
            }
          },

        ];

      sinon.stub(MatchesModel.prototype, 'getMatches').resolves(MatchesMock);
      const { status, body } = await chai.request(app).get('/matches');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(MatchesMock);
    });
  });
});
