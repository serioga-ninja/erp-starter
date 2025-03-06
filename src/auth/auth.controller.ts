import { GoogleOauthService } from '@app/common';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { TOKEN_KEY } from './constant';
import { AuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _googleOauthService: GoogleOauthService,
  ) {}

  @Get('google')
  auth(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const authorizationUrl = this._googleOauthService.generateRedirectUrl(req);

    res.redirect(authorizationUrl, 302);
  }

  @Get('google/callback')
  async googleAuthCallback(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    const result = await this._googleOauthService.validateCallbackRequest(req);
    const token = await this._authService.signInWithGoogle(result);

    req.session.set(TOKEN_KEY, token.token);

    return res.status(HttpStatus.OK);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Req() req: FastifyRequest) {
    req.session.delete();
  }
}
