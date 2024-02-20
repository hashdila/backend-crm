import { PartialType } from '@nestjs/mapped-types';
import { CreateDocuDto } from './create-docu.dto';

export class UpdateDocuDto extends PartialType(CreateDocuDto) {}
