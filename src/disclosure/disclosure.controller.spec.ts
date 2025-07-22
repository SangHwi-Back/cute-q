import { Test, TestingModule } from '@nestjs/testing';
import { DisclosureController } from './disclosure.controller';
import { DisclosureService } from './disclosure.service';

describe('DisclosureController', () => {
  let controller: DisclosureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisclosureController],
      providers: [DisclosureService],
    }).compile();

    controller = module.get<DisclosureController>(DisclosureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
