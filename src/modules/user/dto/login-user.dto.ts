import {IsEmail, IsString, Length} from 'class-validator';
import {USER_VALIDATION} from '../user-const.js';

const {EMAIL, PASSWORD} = USER_VALIDATION;

export class LoginUserDto {
  @IsEmail({}, {message: EMAIL.MessageValid})
  public email!: string;

  @IsString({message: PASSWORD.MessageRequired})
  @Length(PASSWORD.Min, PASSWORD.Max, {message: PASSWORD.MessageValid})
  public password!: string;
}
