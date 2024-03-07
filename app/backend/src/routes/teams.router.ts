import { Request, Response, Router } from 'express';
import TeamsController from '../controller/Teams.crontroller';

const teamsRouter = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsRouter.getTeams(req, res));

export default router;
