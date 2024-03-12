import MatchModel from '../database/models/Match.model';
import { Match } from '../Interfaces/matches/Matches';
import TeamModel from '../database/models/Team.Model';

export default class MatchesModel {
  constructor(private model = MatchModel) { }

  async getMatches(): Promise<Match[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async getInProgressTrue(): Promise<Match[]> {
    const matches = await this.model.findAll({
      where: { inProgress: true },
      include: [{
        model: TeamModel,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: TeamModel,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }

  async getInProgressFalse(): Promise<Match[]> {
    const matches = await this.model.findAll({
      where: { inProgress: false },
      include: [{
        model: TeamModel,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: TeamModel,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return matches;
  }
}
