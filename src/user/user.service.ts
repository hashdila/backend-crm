// src/user/user.service.ts
import { Injectable, NotFoundException, UnauthorizedException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,

    
  ) {}

  async create(user: User): Promise<User> {

    const existingUser = await this.findByUsername(user.username);

    if (existingUser) {
      throw new BadRequestException('Username is already taken');
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { userId } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async login(username: string, password: string): Promise<{ user: User; accessToken: string }> {
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === 'rejected') {
      throw new UnauthorizedException('Your account has been rejected. Please contact support.');
    }

    if (user.status !== 'approved') {
      throw new UnauthorizedException('Your account is pending approval.');
    }

    const payload = { username: user.username, sub: user.userId, userType: user.userType };
    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }
}
