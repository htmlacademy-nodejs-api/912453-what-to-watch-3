export class CreateMovieDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public genre!: string[];
  public releaseYear!: number;
  public rating!: number;
  public previewFilePath!: string;
  public movieFilePath!: string;
  public actors!: string[];
  public director!: string;
  public durationInMinutes!: number;
  public commentsCount!: number;
  public userId!: string;
  public posterFilePath!: string;
  public backgroundImageFilePath!: string;
  public backgroundColor!: string;
}
