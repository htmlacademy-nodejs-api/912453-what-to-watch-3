import {Expose} from 'class-transformer';

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

  @Expose()
  public userId!: string;

  @Expose()
  public posterFilePath!: string;

  @Expose()
  public backgroundImageFilePath!: string;

  @Expose()
  public backgroundColor!: string;
}
