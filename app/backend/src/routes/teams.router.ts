import { Request, Response, Router } from 'express';
import TeamsController from '../controller/Teams.crontroller';

const teamsRouter = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsRouter.getTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsRouter.getTeamById(req, res));

export default router;
