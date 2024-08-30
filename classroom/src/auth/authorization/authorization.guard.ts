import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE =
      this.configService.get<string>('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get<string>('AUTH0_DOMAIN') ?? '';
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const httpContext = context.switchToHttp();
    // const req = httpContext.getRequest();
    // const res = httpContext.getResponse();

    const { req, res } = GqlExecutionContext.create(context).getContext();

    const checkJWT = promisify(
      expressjwt({
        // @ts-expect-error: Suppress type error
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJWT(req, res);
      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
