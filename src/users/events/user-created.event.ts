import { Users } from '@prisma/client';

export default class UserCreatedEvent {
  static readonly type = 'user_registered';

  constructor(public readonly user: Users) {}
}
