import { Module } from '@nestjs/common';
import { CorpService } from './corp.service';
import { CorpController } from './corp.controller';

@Module({
  controllers: [CorpController],
  providers: [CorpService],
})
export class CorpModule {}
