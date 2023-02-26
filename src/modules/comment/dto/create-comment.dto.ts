import {IsInt, IsString, Length, Max, Min} from 'class-validator';
import {COMMENT_VALIDATION} from '../comment-const.js';

const {MESSAGE, RATING} = COMMENT_VALIDATION;

export class CreateCommentDto {
  @IsString({message: MESSAGE.MessageRequired})
  @Length(MESSAGE.MinLength, MESSAGE.MaxLength, {message: MESSAGE.MessageValid})
  public message!: string;

  @IsInt({message: RATING.MessageRequired})
  @Min(RATING.Min)
  @Max(RATING.Max)
  public rating!: number;

  public userId!: string;

  public movieId!: string;
}
