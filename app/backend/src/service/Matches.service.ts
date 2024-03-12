import MatchesModel from '../models/Matches.model';
import { Match } from '../Interfaces/matches/Matches';
import { serviceResponse } from '../Interfaces/serviceResponse';

export default class MatchesService {
  constructor(private matchesM: MatchesModel = new MatchesModel()) { }

  async getMatches(): Promise<serviceResponse<Match[]>> {
    const matches = await this.matchesM.getMatches();
    return { status: 200, data: matches };
  }

  async getMatchesInProgress(inProgress: boolean): Promise<serviceResponse<Match[]>> {
    if (inProgress) {
      const matches = await this.matchesM.getInProgressTrue();
      return { status: 200, data: matches };
    }
    const matches = await this.matchesM.getInProgressFalse();
    return { status: 200, data: matches };
  }
}
