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
}
