import { EmailsService } from '@app/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import SendRegistrationEmailCommand from './send-registration-email.command';

@CommandHandler(SendRegistrationEmailCommand)
export default class SendRegistrationEmailHandler
  implements ICommandHandler<SendRegistrationEmailCommand>
{
  constructor(private readonly _emailsService: EmailsService) {}

  async execute({ user }: SendRegistrationEmailCommand) {
    const to = user.email;

    await this._emailsService.sendEmail({
      subject: `Welcome to the app!`,
      html: `<p>Hi ${user.email},</p><p>Thank you for registering!</p>`,
      to,
    });
  }
}
