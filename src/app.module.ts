import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ChngerequestModule } from './chngerequest/chngerequest.module';
import { CR } from './chngerequest/chngerequest.entity';
import { CrpModule } from './cr-p/cr-p.module';
import { Crp } from './cr-p/cr-p.entity'

import { AdminModule } from './admin/admin.module';
import { JwtAuthGuard } from './authuntication/JwtAuthGuard';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'crms',
      entities: [User, CR, Crp],
      synchronize: true,
    }),

    UserModule,
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1h' },

    }),
    ConfigModule.forRoot(),

    ChngerequestModule,
    CrpModule,
    AdminModule,
    
  ],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
})

export class AppModule { }

