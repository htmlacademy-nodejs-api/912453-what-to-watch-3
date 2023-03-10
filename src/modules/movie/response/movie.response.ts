import {Expose, Type} from 'class-transformer';
import {UserResponse} from '../../user/response/user.response.js';

export class MovieResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public genre!: string;

  @Expose()
  public releaseYear!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public previewFilePath!: string;

  @Expose()
  public movieFilePath!: string;

  @Expose()
  public actors!: string[];

  @Expose()
  public director!: string;

  @Expose()
  public durationInMinutes!: number;

  @Expose()
  public commentsCount!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public posterFilePath!: string;

  @Expose()
  public backgroundImageFilePath!: string;

  @Expose()
  public backgroundColor!: string;
}
