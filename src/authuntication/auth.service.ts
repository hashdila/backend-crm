import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signPayload(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async validateUser(user: User): Promise<boolean> {
    // Here, you can query your database or external service to validate the user
    return user.username === 'test' && user.password === 'test';
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.signPayload(payload),
    };
  }
}
