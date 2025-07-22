import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
}
