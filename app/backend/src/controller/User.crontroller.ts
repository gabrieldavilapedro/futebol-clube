import { Request, Response } from 'express';
import UserService from '../service/Users.service';

export default class UserController {
  constructor(private userService: UserService = new UserService()) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.login({ email, password });
    const { status, data } = user;
    if (status !== 200) return res.status(status).json(data);
    return res.status(200).json(user.data);
  }
}
