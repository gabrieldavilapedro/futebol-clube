import * as bcrypt from 'bcryptjs';
import PayloadUser from '../Interfaces/users/payload';
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

  async getRole(token: string): Promise<serviceResponse<UserLogin>> {
    if (!token) {
      return { status: 400, data: { message: 'Token not found' } };
    }
    const extractT = this.jwt.extractT(token);
    const userE = this.jwt.verify(extractT);
    const { email } = userE as PayloadUser;
    const user = await this.userModel.login(email);
    
    if (user) {
      const { role } = user;
      return { status: 200, data: { role } };
    }
    return { status: 404, data: { message: 'User not found' } };
  }
}
