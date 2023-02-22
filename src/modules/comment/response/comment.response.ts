import {Expose} from 'class-transformer';

export class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public message!: string;

  @Expose({ name: 'postedAt'})
  public postDate!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public userId!: string;
}
