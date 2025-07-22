import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorpModule } from './corp/corp.module';
import { DisclosureModule } from './disclosure/disclosure.module';
import { ReportModule } from './report/report.module';
import { ConfigModule } from '@nestjs/config';
import { ApiService } from './common/apiService';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CorpModule,
    DisclosureModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApiService],
})
export class AppModule {}
