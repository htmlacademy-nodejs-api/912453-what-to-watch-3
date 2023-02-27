import {IsEmail, IsOptional, IsString, Length, Matches} from 'class-validator';
import {USER_VALIDATION} from '../user-const.js';

const {NAME, EMAIL, AVATAR, PASSWORD} = USER_VALIDATION;

export class CreateUserDto {
  @IsString({message: NAME.MessageRequired})
  @Length(NAME.Min, NAME.Max, {message: NAME.MessageValid})
  public name!: string;

  @IsEmail({}, {message: EMAIL.MessageValid})
  public email!: string;

  @IsOptional()
  @Matches(/\.(jpg|png)$/, {message: AVATAR.MessageValid})
  public avatar?: string;

  @IsString({message: PASSWORD.MessageRequired})
  @Length(PASSWORD.Min, PASSWORD.Max, {message: PASSWORD.MessageValid})
  public password!: string;
}
