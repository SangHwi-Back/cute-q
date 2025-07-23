import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/common/apiService';
import { ENDPOINTS } from 'src/common/endPoints';
import {
  SeasonalDisclosure,
  SeasonalDisclosureResponse,
  DisclosureDocumentRequest,
  CorpCodeResponse,
} from './dto/disclosure.dto';

@Injectable()
export class DisclosureService {
  constructor(private readonly apiService: ApiService) {}

  async getSeasonalDisclosure(
    params: SeasonalDisclosure,
  ): Promise<SeasonalDisclosureResponse> {
    const data = await this.apiService.get<
      SeasonalDisclosure,
      SeasonalDisclosureResponse
    >(ENDPOINTS.DART_LIST, {
      ...params,
      crtfc_key: process.env.ENV_KEY_OPENDART as string,
    });

    return data;
  }

  async getDocument(params: DisclosureDocumentRequest): Promise<ArrayBuffer> {
    const data = await this.apiService.getBinary<DisclosureDocumentRequest>(
      ENDPOINTS.DART_DOCUMENT,
      {
        ...params,
        crtfc_key: process.env.ENV_KEY_OPENDART as string,
      },
    );

    return data;
  }

  async getCorpCode(token: string): Promise<ArrayBuffer> {
    const data = await this.apiService.getBinary<{ crtfc_key: string }>(
      ENDPOINTS.DART_CORP_CODE,
      {
        crtfc_key: token,
      },
    );

    return data;
  }
}
