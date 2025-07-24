import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DisclosureService } from './disclosure.service';
import { DisclosureGuard } from './guard/disclosure.guard';
import { Token } from './token/token.decorator';

@Controller('disclosure')
export class DisclosureController {
  constructor(private readonly disclosureService: DisclosureService) {}

  @Get()
  @UseGuards(DisclosureGuard)
  async seasonalKOSDAQDisclosure(
    @Token() token: string,
    @Query('corpCls') corpCls?: string,
    @Query('pbIntfTy') pbIntfTy?: string,
    @Query('corpCode') corpCode?: string,
    @Query('lastReprtAt') lastReprtAt?: string,
    @Query('bgnDe') bgnDe?: string,
    @Query('endDe') endDe?: string,
    @Query('sort') sort?: string,
    @Query('sortMth') sortMth?: string,
  ) {
    return this.disclosureService.getSeasonalDisclosure({
      crtfc_key: token,
      ...(corpCls && { corp_cls: corpCls }),
      ...(pbIntfTy && { pblntf_ty: pbIntfTy }),
      ...(corpCode && { corp_code: corpCode }),
      ...(bgnDe && { bgn_de: bgnDe }),
      ...(endDe && { end_de: endDe }),
      ...(lastReprtAt && { last_reprt_at: lastReprtAt }),
      ...(sort && { sort }),
      ...(sortMth && { sort_mth: sortMth }),
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
}
