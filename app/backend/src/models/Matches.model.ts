import MatchModel from '../database/models/Match.model';
import { MatchesModelInterface } from '../Interfaces/matches/MatchesModelInterface';
import { Match } from '../Interfaces/matches/Matches';
import TeamModel from '../database/models/Team.Model';

export default class MatchesModel implements MatchesModelInterface {
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
}
