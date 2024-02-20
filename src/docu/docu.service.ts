import { Injectable } from '@nestjs/common';
import { CreateDocuDto } from './dto/create-docu.dto';
import { UpdateDocuDto } from './dto/update-docu.dto';

@Injectable()
export class DocuService {
  create(createDocuDto: CreateDocuDto) {
    return 'This action adds a new docu';
  }

  findAll() {
    return `This action returns all docu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} docu`;
  }

  update(id: number, updateDocuDto: UpdateDocuDto) {
    return `This action updates a #${id} docu`;
  }

  remove(id: number) {
    return `This action removes a #${id} docu`;
  }
}
