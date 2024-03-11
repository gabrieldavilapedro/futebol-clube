import * as bcrypt from 'bcryptjs';
import { Token } from '../Interfaces/users/token';
import JWT from '../utils/JTW';
import { UserLogin } from '../Interfaces/users/User';
import { UserModelInterface } from '../Interfaces/users/UserModelInterface';
import { serviceResponse } from '../Interfaces/serviceResponse';
import UserModel from '../models/Users.model';

export default class UsersService {
  constructor(
    private userModel: UserModelInterface = new UserModel(),
    private jwt = JWT,
  ) {}

  async login(user: UserLogin): Promise<serviceResponse<Token>> {
    const { email, password } = user as UserLogin;
    const userFound = await this.userModel.login(email);
    const emailRegex = /^[a-zA-Z]+@.+\.(com)$/;

    if (!email || !password) return { status: 400, data: { message: 'All fields must be filled' } };

    if (userFound === null
      || !emailRegex.test(email)
      || !bcrypt.compareSync(password, userFound.password)
    ) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const token = this.jwt.tokenGenerate({ email });
    return { status: 200, data: { token } };
  }
}
