import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorpModule } from './corp/corp.module';
import { DisclosureModule } from './disclosure/disclosure.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [CorpModule, DisclosureModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
