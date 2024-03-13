import { Request, Response } from 'express';
import MatchesService from '../service/Matches.service';

export default class MatchesController {
  constructor(private MatchesS: MatchesService = new MatchesService()) { }

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.MatchesS.getMatchesInProgress(inProgress === 'true');
      return res.status(matches.status).json(matches.data);
    }
    const matches = await this.MatchesS.getMatches();
    return res.status(matches.status).json(matches.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const matcheFinish = await this.MatchesS.finishMatchInProgress(Number(id));
    if (matcheFinish.status !== 200) {
      return res.status(matcheFinish.status).json(matcheFinish.data);
    }
    return res.status(200).json(matcheFinish.data);
  }

  public async upudateGolsMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const matcheFinish = await this.MatchesS
      .upudateGolsMatch(Number(id), homeTeamGoals, awayTeamGoals);
    if (matcheFinish.status !== 200) {
      return res.status(matcheFinish.status).json(matcheFinish.data);
    }
    return res.status(200).json(matcheFinish.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const matcheFinish = await this.MatchesS.createMatch(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    if (matcheFinish.status !== 201) {
      return res.status(matcheFinish.status).json(matcheFinish.data);
    }
    return res.status(201).json(matcheFinish.data);
  }
}
