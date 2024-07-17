import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService = new LeaderboardService()) { }

  public async getLeaderboard(req: Request, res: Response) {
    const route = req.originalUrl.split('/').pop();
    const leaderboard = await this.leaderboardService.getLeaderboard(route);
    const { status, data } = leaderboard;
    if (status !== 200) return res.status(status).json(data);
    return res.status(200).json(leaderboard.data);
  }
}
