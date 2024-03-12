import { Request, Response } from 'express';
import MatchesService from '../service/Matches.service';

export default class MatchesController {
  constructor(private MatchesS: MatchesService = new MatchesService()) { }

  public async getMatches(_req: Request, res: Response) {
    const { status, data } = await this.MatchesS.getMatches();
    if (status !== 200) {
      return res.status(status).json({ message: 'Error fetching matches' });
    }
    return res.status(status).json(data);
  }
}
