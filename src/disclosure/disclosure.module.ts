import { Module } from '@nestjs/common';
import { DisclosureService } from './disclosure.service';
import { DisclosureController } from './disclosure.controller';

@Module({
  controllers: [DisclosureController],
  providers: [DisclosureService],
})
export class DisclosureModule {}
