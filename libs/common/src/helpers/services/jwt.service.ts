import { ProjectConfig } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

type TokenResponse = {
  token: string;
  expires?: Date;
};

@Injectable()
export default class MyJwtService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService<ProjectConfig, true>,
    // private readonly _logger: Logger,
  ) {
    // this._logger.setContext(MyJwtService.name);
  }

  parseToken<T extends object>(token: string): T | null {
    try {
      return this._jwtService.verify<T>(token, {
        algorithms: ['HS256'],
        secret: this._configService.get('JWT_SECRET'),
      });
    } catch (e) {
      // this._logger.logError(e);

      return null;
    }
  }

  generateToken<T extends object>(tokenPayload: T): TokenResponse {
    const jwtExpiresIn = this._configService.get<number | undefined>(
      'JWT_EXPIRATION_SEC',
    );
    let expires: undefined | Date;

    if (jwtExpiresIn) {
      expires = new Date();
      expires.setSeconds(expires.getSeconds() + jwtExpiresIn);
    }

    const token = this._jwtService.sign(tokenPayload, {
      algorithm: 'HS256',
      secret: this._configService.get('JWT_SECRET'),
      expiresIn: jwtExpiresIn,
    });

    return {
      token,
      expires,
    };
  }
}
