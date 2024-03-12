import { Request, Response } from 'express';
import MatchesService from '../service/Matches.service';

export default class MatchesController {
  constructor(private MatchesS: MatchesService = new MatchesService()) { }

  public async getMatches(_req: Request, res: Response) {
    const { inProgress } = _req.query;
    if (inProgress) {
      const matches = await this.MatchesS.getMatchesInProgress(inProgress === 'true');
      return res.status(matches.status).json(matches.data);
    }
    const matches = await this.MatchesS.getMatches();
    return res.status(matches.status).json(matches.data);
  }
}
