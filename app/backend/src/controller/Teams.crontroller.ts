import { Request, Response } from 'express';
import TeamsService from '../service/Teams.service';

export default class TeamsController {
  constructor(private TeamsS: TeamsService = new TeamsService()) { }

  public async getTeams(_req: Request, res: Response) {
    const { status, data } = await this.TeamsS.getTeams();
    return res.status(status).json(data);
  }
}
