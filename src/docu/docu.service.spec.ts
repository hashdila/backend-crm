import { Test, TestingModule } from '@nestjs/testing';
import { DocuService } from './docu.service';

describe('DocuService', () => {
  let service: DocuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocuService],
    }).compile();

    service = module.get<DocuService>(DocuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
