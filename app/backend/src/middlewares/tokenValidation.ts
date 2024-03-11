import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JTW';

export default class TokenValidation {
  private static jwt = JWT;

  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const extractT = TokenValidation.jwt.extractT(token);
    const userE = TokenValidation.jwt.verify(extractT);
    if (userE === 'Token must be a valid token') {
      return res.status(401)
        .json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
