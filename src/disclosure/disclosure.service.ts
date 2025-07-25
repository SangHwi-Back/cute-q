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
import { Client, Config } from 'pg';

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

  // KRX에서 종가를 받아오는 더미 함수 (실제 구현 시 외부 API 연동 필요)
  fetchKRXClosePrice(symbol: string, date: string): number {
    // 실제로는 KRX API를 호출해야 함
    // 예시: const price = await fetchFromKRX(symbol, date);
    return 12345; // 예시값
  }

  // 종가를 DB에 저장하는 함수 (PostgreSQL, ORM 미사용)
  async saveClosePrice(
    symbol: string,
    date: string,
    close: number,
  ): Promise<void> {
    const config: Config = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };
    const client = new Client(config);
    await client.connect();
    const query = `
      INSERT INTO stock_close (symbol, date, close)
      VALUES ($1, $2, $3)
      ON CONFLICT (symbol, date) DO UPDATE SET close = EXCLUDED.close
    `;
    await client.query(query, [symbol, date, close]);
    await client.end();
  }
}
