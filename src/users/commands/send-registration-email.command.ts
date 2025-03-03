import { Command } from '@nestjs/cqrs';
import { Users } from '@prisma/client';

export default class SendRegistrationEmailCommand extends Command<void> {
  constructor(public readonly user: Users) {
    super();
  }
}
