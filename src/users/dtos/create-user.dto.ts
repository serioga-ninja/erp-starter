import { IsEmail, IsString, Validate } from 'class-validator';
import { IsEmailUnique } from '../pipes';

export default class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsEmail()
  @Validate(IsEmailUnique)
  email: string;
}
