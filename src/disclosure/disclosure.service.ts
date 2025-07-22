import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/common/apiService';
import { ENDPOINTS } from 'src/common/endPoints';
import {
  SeasonalDisclosure,
  SeasonalDisclosureResponse,
} from './dto/disclosure.dto';

@Injectable()
export class DisclosureService {
  constructor(private readonly apiService: ApiService) {}

  async getSeasonalDisclosure(params: SeasonalDisclosure) {
    const data = await this.apiService.get<
      SeasonalDisclosure,
      SeasonalDisclosureResponse
    >(ENDPOINTS.DART_LIST, {
      ...params,
      crtfc_key: process.env.ENV_KEY_OPENDART as string,
    });

    return data;
  }
}
