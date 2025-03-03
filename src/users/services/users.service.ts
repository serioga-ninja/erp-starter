import { StringService } from '@app/common';
import { EntityStatus } from '@app/common/constant';
import { PrismaService } from '@app/common/db/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Prisma, Users } from '@prisma/client';
import { pick } from 'lodash';
import UserCreatedEvent from '../events/user-created.event';
import { CreateUserData, CreateUserReturn } from '../types';
import PasswordService from './password.service';

@Injectable()
export default class UsersService {
  private readonly _logger = new Logger(UsersService.name);

  constructor(
    private readonly _prisma: PrismaService,
    private readonly _passwordService: PasswordService,
    private readonly _eventBus: EventBus,
    private readonly _string: StringService,
  ) {}

  async isEmailUnique(email: string): Promise<boolean> {
    return !(await this._prisma.users.findFirst({
      where: { email },
    }));
  }

  getOneUserBy(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users | null> {
    return this._prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: CreateUserData): Promise<CreateUserReturn> {
    this._logger.log(`Signing up user with email: ${data.email}`);

    const { salt, hashedPassword } = this._passwordService.generatePassword(
      data.password,
    );

    const user = await this._prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
        salt,
        activationCode: this._string.randomString(30),
        entityStatus: EntityStatus.Registered,
      },
    });

    this._logger.log(`User with email: ${data.email} signed up successfully`);

    this._eventBus.publish(new UserCreatedEvent(user));

    return pick(user, [
      'id',
      'email',
      'firstName',
      'lastName',
      'role',
      'updatedAt',
      'createdAt',
    ] as (keyof CreateUserReturn)[]);
  }
}
