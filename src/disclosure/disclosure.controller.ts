import { Controller, Get } from '@nestjs/common';
import { DisclosureService } from './disclosure.service';

@Controller('disclosure')
export class DisclosureController {
  constructor(private readonly disclosureService: DisclosureService) {}

  @Get()
  async seasonalDisclosure() {
    return this.disclosureService.getSeasonalDisclosure({
      crtfc_key: process.env.ENV_KEY_OPENDART as string,
    });
  }
}
