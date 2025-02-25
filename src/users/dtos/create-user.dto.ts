import { IsEmail, IsString, Validate } from 'class-validator';
import { IsEmailUnique } from '../pipes';

export default class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  @Validate(IsEmailUnique)
  email: string;
}
