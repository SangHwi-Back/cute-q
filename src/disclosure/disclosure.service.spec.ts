import { Test, TestingModule } from '@nestjs/testing';
import { DisclosureService } from './disclosure.service';

describe('DisclosureService', () => {
  let service: DisclosureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisclosureService],
    }).compile();

    service = module.get<DisclosureService>(DisclosureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
