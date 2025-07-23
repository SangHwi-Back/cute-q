import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  async get<Req, Res>(url: string, params: Req): Promise<Res> {
    const query = new URLSearchParams(params as any).toString();
    const response = await fetch(`${url}?${query}`);

    if (response.ok === false) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Res;
  }

  /**
   * GET 요청으로 바이너리 파일(ArrayBuffer) 다운로드
   * @param url 요청 URL
   * @param params 쿼리 파라미터
   * @returns ArrayBuffer (필요시 파일명 등 추가 가능)
   */
  async getBinary<Req>(url: string, params: Req): Promise<ArrayBuffer> {
    const query = new URLSearchParams(params as any).toString();
    const response = await fetch(`${url}?${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.arrayBuffer();
  }
}
