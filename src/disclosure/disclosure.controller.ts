import { Controller } from '@nestjs/common';
import { DisclosureService } from './disclosure.service';

@Controller('disclosure')
export class DisclosureController {
  constructor(private readonly disclosureService: DisclosureService) {}
}
