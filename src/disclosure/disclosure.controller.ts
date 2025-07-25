import {
  Controller,
  Get,
  Query,
  Res,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { DisclosureService } from './disclosure.service';
import { DisclosureGuard } from './guard/disclosure.guard';
import { Token } from './token/token.decorator';
import { SeasonalDisclosureQueryDto } from './dto/disclosure.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('disclosure')
export class DisclosureController {
  constructor(private readonly disclosureService: DisclosureService) {}

  @Get()
  @UseGuards(DisclosureGuard)
  async seasonalKOSDAQDisclosure(
    @Token() token: string,
    @Query(new ValidationPipe({ transform: true }))
    query: SeasonalDisclosureQueryDto,
  ) {
    return this.disclosureService.getSeasonalDisclosure({
      crtfc_key: token,
      ...(query.corpCls && { corp_cls: query.corpCls }),
      ...(query.pbIntfTy && { pblntf_ty: query.pbIntfTy }),
      ...(query.corpCode && { corp_code: query.corpCode }),
      ...(query.bgnDe && { bgn_de: query.bgnDe }),
      ...(query.endDe && { end_de: query.endDe }),
      ...(query.lastReprtAt && { last_reprt_at: query.lastReprtAt }),
      ...(query.sort && { sort: query.sort }),
      ...(query.sortMth && { sort_mth: query.sortMth }),
    });
  }

  @Get('getCorpCode')
  @UseGuards(DisclosureGuard)
  async getCorpCode(@Token() token: string, @Res() res: Response) {
    const data = await this.disclosureService.getCorpCode(token);

    const fileName = `corp_code.zip`;

    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/zip',
      'Content-Length': data.byteLength.toString(),
    });

    res.send(Buffer.from(data));
  }

  @Get('document/:rceptNo')
  @UseGuards(DisclosureGuard)
  async getDocument(
    @Token() token: string,
    @Query('rceptNo') rceptNo: string,
    @Res() res: Response,
  ) {
    const data = await this.disclosureService.getDocument({
      crtfc_key: token,
      rcept_no: rceptNo,
    });

    const fileName = `${rceptNo}.xml`;

    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'application/xml',
      'Content-Length': data.byteLength.toString(),
    });

    res.send(Buffer.from(data));
  }

  @Get('singleAcntAll')
  @UseGuards(DisclosureGuard)
  async getSingleAcntAll(
    @Token() token: string,
    @Query('corp_code') corp_code: string,
    @Query('bsns_year') bsns_year: string,
    @Query('reprt_code') reprt_code: string,
    @Query('fs_div') fs_div: string,
  ) {
    return this.disclosureService.getSingleAcntAll({
      crtfc_key: token,
      corp_code,
      bsns_year,
      reprt_code,
      fs_div,
    });
  }

  @Get('singleIndx')
  @UseGuards(DisclosureGuard)
  async getSingleIndx(
    @Token() token: string,
    @Query('corp_code') corp_code: string,
    @Query('bsns_year') bsns_year: string,
    @Query('reprt_code') reprt_code: string,
    @Query('fs_div') fs_div: string,
  ) {
    return this.disclosureService.getSingleIndx({
      crtfc_key: token,
      corp_code,
      bsns_year,
      reprt_code,
      fs_div,
    });
  }

  @Get('cmpnyIndx')
  @UseGuards(DisclosureGuard)
  async getCmpnyIndx(
    @Token() token: string,
    @Query('corp_code') corp_code: string,
    @Query('bsns_year') bsns_year: string,
    @Query('reprt_code') reprt_code: string,
    @Query('idx_cl_code') idx_cl_code: string,
  ) {
    return this.disclosureService.getCmpnyIndx({
      crtfc_key: token,
      corp_code,
      bsns_year,
      reprt_code,
      idx_cl_code,
    });
  }

  @Post('saveClose')
  async saveClose(@Body() body: { symbol: string; date: string }) {
    const close = this.disclosureService.fetchKRXClosePrice(
      body.symbol,
      body.date,
    );
    await this.disclosureService.saveClosePrice(body.symbol, body.date, close);
    return { symbol: body.symbol, date: body.date, close };
  }
}
