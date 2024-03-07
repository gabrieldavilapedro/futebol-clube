import { TeamModelInterface } from '../Interfaces/TeamModelInterface';
import { Team } from '../Interfaces/Team';
import TeamModelS from '../database/models/Team.Model';

export default class TeamModel implements TeamModelInterface {
  private model = TeamModelS;

  async findAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams.map((team) => team.get());
  }

  async findById(id: number): Promise<Team | null> {
    const team = await this.model.findByPk(id);
    return team ? team.get() : null;
  }
}
