import { UserModelInterface } from '../Interfaces/users/UserModelInterface';
import { UserLogin } from '../Interfaces/users/User';
import UserModelS from '../database/models/User.Model';

export default class UserModel implements UserModelInterface {
  private model = UserModelS;

  async login(e: string): Promise<UserLogin | null> {
    const result = await this.model.findOne({ where: { email: e } });
    if (!result) return null;
    const { email, password } = result;
    return { email, password };
  }
}
