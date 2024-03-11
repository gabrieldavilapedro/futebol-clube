import { UserLogin } from './User';

export interface UserModelInterface {
  login(email: string): Promise<UserLogin | null>;
}
