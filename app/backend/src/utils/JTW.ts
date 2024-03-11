import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'xablau';

  private static jwtConfig: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  static extractT(token: string): string {
    return token.split(' ')[1];
  }

  static tokenGenerate(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, this.secret) as JwtPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
