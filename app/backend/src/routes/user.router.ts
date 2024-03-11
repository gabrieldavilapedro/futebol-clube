import { Request, Response, Router } from 'express';
import UserController from '../controller/User.crontroller';
import TokenValidation from '../middlewares/tokenValidation';

const userRouter = new UserController();

const router = Router();

router.post('/', (req: Request, res: Response) => userRouter.login(req, res));
router.get(
  '/role',
  TokenValidation.verifyToken,
  (req: Request, res: Response) => userRouter.getRole(req, res),
);

export default router;
