import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocuService } from './docu.service';
import { CreateDocuDto } from './dto/create-docu.dto';
import { UpdateDocuDto } from './dto/update-docu.dto';

@Controller('docu')
export class DocuController {
  constructor(private readonly docuService: DocuService) {}

  @Post()
  create(@Body() createDocuDto: CreateDocuDto) {
    return this.docuService.create(createDocuDto);
  }

  @Get()
  findAll() {
    return this.docuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocuDto: UpdateDocuDto) {
    return this.docuService.update(+id, updateDocuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docuService.remove(+id);
  }
}
