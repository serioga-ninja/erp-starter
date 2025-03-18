import { GoogleProfile, ProjectConfig } from '@app/common';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import type { FastifyRequest } from 'fastify';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import { google } from 'googleapis';
import * as url from 'url';

@Injectable()
export default class GoogleOauthService {
  private readonly _logs = new Logger(GoogleOauthService.name);
  private readonly _oauth2Client: OAuth2Client;

  constructor(
    private readonly _configService: ConfigService<ProjectConfig, true>,
  ) {
    this._oauth2Client = new google.auth.OAuth2(
      this._configService.get('GOOGLE_CLIENT_ID'),
      this._configService.get('GOOGLE_CLIENT_SECRET'),
      this._configService.get('GOOGLE_CALLBACK_URL'),
    );
  }

  generateRedirectUrl(req: FastifyRequest): string {
    // Access scopes for two non-Sign-In scopes: Read-only Drive activity and Google Calendar.
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    // Generate a secure random state value.
    const state = randomBytes(32).toString('hex');

    // Store state in the session
    req.session.set('state', state);

    this._logs.log(req.session.data());

    // Generate a url that asks permissions for the Drive activity and Google Calendar scope
    return this._oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      /** Pass in the scopes array defined above.
       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: scopes,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true,
      // Include the state parameter to reduce the risk of CSRF attacks.
      state: state,
    });
  }

  async validateCallbackRequest(req: FastifyRequest): Promise<GoogleProfile> {
    const q = url.parse(req.url, true).query;

    if (q.error) {
      // An error response e.g. error=access_denied
      // console.log('Error:' + q.error);
    } else if (q.state !== req.session.state) {
      req.session.regenerate();
      req.session.delete();

      throw Error('State mismatch. Possible CSRF attack');
    } else {
      // Get access and refresh tokens (if access_type is offline)

      const { tokens } = await this._oauth2Client.getToken(q.code as string);

      if (
        tokens?.scope?.includes(
          'https://www.googleapis.com/auth/userinfo.profile',
        )
      ) {
        const oauth2Client = new google.auth.OAuth2(); // create new auth client
        oauth2Client.setCredentials({ access_token: tokens.access_token }); // use the new auth client with the access_token
        const oauth2 = google.oauth2({
          auth: oauth2Client,
          version: 'v2',
        });
        const { data } = await oauth2.userinfo.get(); // get user info

        return {
          ...data,
          refresh_token: tokens?.refresh_token,
        } as GoogleProfile;
      }
    }

    throw new UnauthorizedException();
  }
}
