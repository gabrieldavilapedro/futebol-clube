import { JwtPayload } from 'jsonwebtoken';

export default interface PayloadUser extends JwtPayload{
  email: string
}
