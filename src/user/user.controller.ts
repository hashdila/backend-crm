// src/user/user.controller.ts
import { Controller, Post, Body, Get, Put, UseGuards, Request, UnauthorizedException, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }): Promise<{ user: User; accessToken: string, userType: string }> {
    try {
      const { user, accessToken, userType } = await this.userService.login(credentials.username, credentials.password);
      return { user, accessToken, userType };
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

  @Post('approve/:userId')
  async approveUser(@Param('userId') userId: number): Promise<string> {
    await this.userService.approveUser(userId);
    return 'User approved';
  }

  @Post('reject/:userId')
  async rejectUser(@Param('userId') userId: number): Promise<string> {
    await this.userService.rejectUser(userId);
    return 'User rejected';
  }

  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() updatedUser: User): Promise<User> {
    return await this.userService.updateUser(parseInt(userId, 10), updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req) {
    try {
      return await this.userService.getUserProfile(req.user.userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User profile not found');
      }
      throw error;
    }
  }




}
