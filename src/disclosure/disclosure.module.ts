import { Module } from '@nestjs/common';
import { DisclosureService } from './disclosure.service';
import { DisclosureController } from './disclosure.controller';
import { ApiService } from 'src/common/apiService';

@Module({
  controllers: [DisclosureController],
  providers: [DisclosureService, ApiService],
})
export class DisclosureModule {}
