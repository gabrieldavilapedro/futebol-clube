import { Request, Response, Router } from 'express';
import UserController from '../controller/User.crontroller';

const userRouter = new UserController();

const router = Router();

router.post('/', (req: Request, res: Response) => userRouter.login(req, res));

export default router;
