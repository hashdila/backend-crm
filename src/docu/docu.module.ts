import { Module } from '@nestjs/common';
import { DocuService } from './docu.service';
import { DocuController } from './docu.controller';

@Module({
  controllers: [DocuController],
  providers: [DocuService],
})
export class DocuModule {}
