import {IsOptional, Length, Matches} from 'class-validator';
import {USER_VALIDATION} from '../user-const.js';

const {NAME, AVATAR} = USER_VALIDATION;

export class UpdateUserDto {
  @IsOptional()
  @Length(NAME.Min, NAME.Max, {message: NAME.MessageValid})
  public name?: string;

  @IsOptional()
  @Matches(/\.(jpg|png)$/, {message: AVATAR.MessageValid})
  public avatar?: string;
}
