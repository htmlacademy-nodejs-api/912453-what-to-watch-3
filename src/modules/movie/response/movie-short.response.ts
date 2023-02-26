import {Expose, Type} from 'class-transformer';
import {UserResponse} from '../../user/response/user.response.js';

export class MovieShortResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public genre!: string;

  @Expose()
  public previewFilePath!: string;

  @Expose()
  public commentsCount!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public posterFilePath!: string;
}
