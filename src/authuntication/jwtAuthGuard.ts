import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../user/user.service';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = await this.validateUser(request);

    request.user = user;

    return true;
  }

  async validateUser(request: Request) {
    const token = this.extractJwtFromRequest(request);
    if (!token) {
      throw new UnauthorizedException('Missing JWT token');
    }

    // Validate token and get user from database
    const decodedToken = this.jwtService.verify(token);
    const user = await this.userService.findOne(decodedToken.id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }

  private extractJwtFromRequest(request: Request) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing JWT token');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid JWT token');
    }

    return parts[1];
  }
}
