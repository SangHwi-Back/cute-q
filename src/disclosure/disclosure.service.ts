import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/common/apiService';
import { ENDPOINTS } from 'src/common/endPoints';
import {
  SeasonalDisclosure,
  SeasonalDisclosureResponse,
  DisclosureDocumentRequest,
  SingleAcntAllRequest,
  SingleAcntAllResponse,
  SingleIndxRequest,
  SingleIndxResponse,
  CmpnyIndxRequest,
  CmpnyIndxResponse,
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

  async getSingleAcntAll(
    params: SingleAcntAllRequest,
  ): Promise<SingleAcntAllResponse> {
    const data = await this.apiService.get<
      SingleAcntAllRequest,
      SingleAcntAllResponse
    >(ENDPOINTS.DART_SINGLE_ACNT_ALL, {
      ...params,
      crtfc_key: process.env.ENV_KEY_OPENDART as string,
    });

    return data;
  }

  async getSingleIndx(params: SingleIndxRequest): Promise<SingleIndxResponse> {
    const data = await this.apiService.get<
      SingleIndxRequest,
      SingleIndxResponse
    >(ENDPOINTS.DART_SINGLE_INDX, {
      ...params,
      crtfc_key: process.env.ENV_KEY_OPENDART as string,
    });
    return data;
  }

  async getCmpnyIndx(params: CmpnyIndxRequest): Promise<CmpnyIndxResponse> {
    const data = await this.apiService.get<CmpnyIndxRequest, CmpnyIndxResponse>(
      ENDPOINTS.DART_CMPNY_INDX,
      {
        ...params,
        crtfc_key: process.env.ENV_KEY_OPENDART as string,
      },
    );
    return data;
  }
}
