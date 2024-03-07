import TeamModel from '../models/Teams.model';

export default class TeamsService {
  constructor(private TeamM: TeamModel = new TeamModel()) { }

  public async getTeams() {
    const teams = await this.TeamM.findAll();
    return { status: 200, data: teams };
  }

  public async getTeamById(id: number) {
    const team = await this.TeamM.findById(id);
    return { status: 200, data: team };
  }
}
