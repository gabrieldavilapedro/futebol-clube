import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.controller';

const matchesRouter = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesRouter.getMatches(req, res));

export default router;
