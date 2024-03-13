import TeamModel from '../models/Teams.model';
import MatchesModel from '../models/Matches.model';
import { Match } from '../Interfaces/matches/Matches';
import { serviceResponse } from '../Interfaces/serviceResponse';

export default class MatchesService {
  constructor(
    private matchesM: MatchesModel = new MatchesModel(),
    private teamM: TeamModel = new TeamModel(),
  ) { }

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

  public async finishMatchInProgress(id: number): Promise<serviceResponse<Match>> {
    const getById = await this.matchesM.getMatcheById(id);
    if (!getById) {
      return { status: 404, data: { message: 'Not found this id' } };
    }
    await this.matchesM.updateToFinish(id);
    return { status: 200, data: { message: 'Finished' } };
  }

  public async upudateGolsMatch(id: number, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<serviceResponse<Match>> {
    const getById = await this.matchesM.getMatcheById(id);
    if (!getById) {
      return { status: 404, data: { message: 'Not found this id' } };
    }
    await this.matchesM.updateGolsMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 200, data: { message: 'Updated' } };
  }

  public async createMatch(match: Match): Promise<serviceResponse<Match>> {
    const { homeTeamId, awayTeamId } = match;
    const homeTeam = await this.teamM.findById(homeTeamId);
    const awayTeam = await this.teamM.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }
    if (homeTeamId === awayTeamId) {
      return { status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const newMatch = await this.matchesM.createMatch(match);
    return { status: 201, data: newMatch };
  }
}
