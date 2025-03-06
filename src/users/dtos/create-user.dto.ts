import { IsBoolean, IsEmail, IsString, Validate } from 'class-validator';
import { IsEmailUnique } from '../pipes';

export default class CreateUserDto {
  @IsEmail()
  @Validate(IsEmailUnique)
  email: string;

  @IsEmail()
  personalEmail: string;

  @IsString()
  phone: string;

  @IsBoolean()
  onboardingRequired: boolean;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  name: string;

  @IsString()
  dob: Date;

  @IsString()
  gender: string;

  @IsString()
  role: string;
}
