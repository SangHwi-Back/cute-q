import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/common/apiService';
import {
  SeasonalDisclosure,
  SeasonalDisclosureResponse,
} from './dto/disclosure.dto';

@Injectable()
export class DisclosureService {
  constructor(private readonly apiService: ApiService) {}

  async getSeasonalDisclosure(params: SeasonalDisclosure) {
    const url = 'https://opendart.fss.or.kr/api/list.json';
    const data = await this.apiService.get<
      SeasonalDisclosure,
      SeasonalDisclosureResponse
    >(url, {
      ...params,
      crtfc_key: process.env.ENV_KEY_OPENDART as string,
    });

    return data;
  }
}
