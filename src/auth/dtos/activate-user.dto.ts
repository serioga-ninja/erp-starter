import { IsString } from 'class-validator';

export default class ActivateUserDto {
  @IsString()
  activationCode: string;
}
