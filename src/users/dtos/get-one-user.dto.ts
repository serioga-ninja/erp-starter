import { IsString } from 'class-validator';

export default class GetOneUserDto {
  @IsString()
  userId: string;
}
