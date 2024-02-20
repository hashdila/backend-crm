import { Test, TestingModule } from '@nestjs/testing';
import { DocuController } from './docu.controller';
import { DocuService } from './docu.service';

describe('DocuController', () => {
  let controller: DocuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocuController],
      providers: [DocuService],
    }).compile();

    controller = module.get<DocuController>(DocuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
