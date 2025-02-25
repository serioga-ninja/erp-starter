import { IsEmail, IsString } from 'class-validator';

export default class SignInDto {
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
