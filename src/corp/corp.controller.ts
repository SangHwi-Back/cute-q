import { Controller } from '@nestjs/common';
import { CorpService } from './corp.service';

@Controller('corp')
export class CorpController {
  constructor(private readonly corpService: CorpService) {}
}
