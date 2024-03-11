import { Router } from 'express';

import teamsRouter from './teams.router';
import userRouter from './user.router';

const router = Router();

router.use('/teams', teamsRouter);

router.use('/login', userRouter);

export default router;
