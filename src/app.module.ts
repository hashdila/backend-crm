import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ChngerequestModule } from './chngerequest/chngerequest.module';
import { CR } from './chngerequest/chngerequest.entity';
import { CrpModule } from './cr-p/cr-p.module';
import {Crp} from './cr-p/cr-p.entity'
import { DocuModule } from './docu/docu.module';
import { AdminModule } from './admin/admin.module';

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
        secret: 'pass@123', 
        signOptions: { expiresIn: '6h' },
      }),
      
      ChngerequestModule,
      CrpModule,
      DocuModule,
      AdminModule,
  ],
})
export class AppModule {}
