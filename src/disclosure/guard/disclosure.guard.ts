import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class DisclosureGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { token: string }>();
    request.token = process.env.ENV_KEY_OPENDART as string;
    return true;
  }
}
