import { TeamModelInterface } from '../Interfaces/TeamModelInterface';
import { Team } from '../Interfaces/Team';
import TeamModelS from '../database/models/Team.Model';

export default class TeamModel implements TeamModelInterface {
  private model = TeamModelS;

  async findAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams.map((team) => team.get());
  }
}
