import {Expose, Type} from 'class-transformer';
import {UserResponse} from '../../user/response/user.response.js';

export class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public message!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}
