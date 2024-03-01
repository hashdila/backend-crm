import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './path/to/user.repository';
import { UserService } from './path/to/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    // other imports
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
