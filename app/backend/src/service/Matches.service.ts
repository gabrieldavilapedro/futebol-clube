import MatchesModel from '../models/Matches.model';
import { Match } from '../Interfaces/matches/Matches';
import { serviceResponse } from '../Interfaces/serviceResponse';

export default class MatchesService {
  constructor(private matchesM: MatchesModel = new MatchesModel()) { }

  async getMatches(): Promise<serviceResponse<Match[]>> {
    const matches = await this.matchesM.getMatches();
    return { status: 200, data: matches };
  }
}
