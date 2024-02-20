// src/user/user.controller.ts
import { Controller, Post, Body, Get, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }): Promise<{ user: User; accessToken: string }> {
    try {
      const { user, accessToken } = await this.userService.login(credentials.username, credentials.password);
      return { user, accessToken };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw error;
    }
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('approve')
  approveUser(@Body() userData: { userId: number }) {
    return 'User approved';
  }

  @Post('reject')
  rejectUser(@Body() userData: { userId: number }) {
    return 'User rejected';
  }
}
