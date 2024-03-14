import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/Leaderboard.controller';

const leaderboardRouter = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboardRouter.getLeaderboard(req, res));

export default router;
