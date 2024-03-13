import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.controller';
import TokenValidation from '../middlewares/tokenValidation';

const matchesRouter = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesRouter.getMatches(req, res));

router.patch(
  '/:id/finish',
  TokenValidation.verifyToken,
  (req: Request, res: Response) => matchesRouter.finishMatch(req, res),
);

export default router;
