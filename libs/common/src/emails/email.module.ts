import { Module } from '@nestjs/common';
import EmailsService from './emails.service';
import MailgunEmailProvider from './mailgun-email.provider';

@Module({
  providers: [EmailsService, MailgunEmailProvider],
  exports: [EmailsService],
})
export default class EmailModule {}
