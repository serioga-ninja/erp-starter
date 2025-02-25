import { IsEmail, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
