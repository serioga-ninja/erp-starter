import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces/MailgunClient/IMailgunClient';
import EmailAbstractProvider, {
  SendEmailProps,
} from './email-abstract.provider';
import { EmailConfig } from './types';

@Injectable()
export default class MailgunEmailProvider extends EmailAbstractProvider {
  private readonly _client: IMailgunClient;
  private readonly _logger = new Logger(MailgunEmailProvider.name);

  constructor(private readonly config: ConfigService<EmailConfig>) {
    super();

    const mailgun = new Mailgun(FormData);
    this._client = mailgun.client({
      username: 'api',
      key: config.getOrThrow('MAILGUN_API_KEY'),
    });
  }

  async sendEmail(params: SendEmailProps): Promise<void> {
    try {
      await this._client.messages.create(
        this.config.getOrThrow('MAILGUN_DOMAIN'),
        {
          from: params.from || this.config.getOrThrow('MAILGUN_EMAIL_FROM'),
          to: params.to,
          subject: params.subject,
          html: params.html,
        },
      );
    } catch (error) {
      this._logger.error(error);
    }
  }
}
