import { StringService } from '@app/common';
import { EntityStatus } from '@app/common/constant';
import { PrismaService } from '@app/common/db/prisma.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Prisma, Users } from '@prisma/client';
import CreateUserDto from '../dtos/create-user.dto';
import UserCreatedEvent from '../events/user-created.event';

@Injectable()
export default class UsersService {
  private readonly _logger = new Logger(UsersService.name);

  constructor(
    private readonly _prisma: PrismaService,
    private readonly _eventBus: EventBus,
    private readonly _string: StringService,
  ) {}

  async isEmailUnique(email: string): Promise<boolean> {
    return !(await this._prisma.users.findFirst({
      where: { email },
    }));
  }

  async getOneUserBy(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users> {
    const user = await this._prisma.users.findFirst({
      where: userWhereUniqueInput,
    });

    if (!user) {
      throw new NotFoundException(
        `User not found: ${JSON.stringify(userWhereUniqueInput)}`,
      );
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<Users> {
    this._logger.log(`Signing up user with email: ${data.email}`);

    const user = await this._prisma.users.create({
      data: {
        ...data,
        entityStatus: EntityStatus.Registered,
      },
    });

    this._logger.log(`User with email: ${data.email} signed up successfully`);

    this._eventBus.publish(new UserCreatedEvent(user));

    return user;
  }
}
