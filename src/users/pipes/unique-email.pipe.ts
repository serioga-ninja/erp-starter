import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export default class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly _usersService: UsersService) {}

  validate(email: string): Promise<boolean> {
    return this._usersService.isEmailUnique(email);
  }

  defaultMessage(): string {
    return 'Email $value is already taken';
  }
}
