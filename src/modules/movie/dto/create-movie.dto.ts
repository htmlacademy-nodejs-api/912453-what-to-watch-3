import {IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Length, Matches} from 'class-validator';
import {MOVIE_VALIDATION} from '../movie-const.js';
import {Genre} from '../../../types/genre.enum.js';

const {TITLE, DESCRIPTION, POSTDATE, GENRE, RELEASE_YEAR, PREVIEW_VIDEO, VIDEO, ACTORS,
  DIRECTOR, DURATION, POSTER, BG_IMAGE, BG_COLOR, PROMO} = MOVIE_VALIDATION;
export class CreateMovieDto {
  @IsString({message: TITLE.MessageRequired})
  @Length(TITLE.Min, TITLE.Max, {message: TITLE.MessageValid})
  public title!: string;

  @IsString({message: DESCRIPTION.MessageRequired})
  @Length(DESCRIPTION.Min, DESCRIPTION.Max, {message: DESCRIPTION.MessageValid})
  public description!: string;

  @IsString({message: POSTDATE.MessageRequired})
  @IsDateString({}, {message: POSTDATE.MessageValid})
  public postDate!: Date;

  @IsString({message: GENRE.MessageRequired})
  @IsEnum(Genre, {message: GENRE.MessageValid})
  public genre!: string;

  @IsInt({message: RELEASE_YEAR.MessageRequired})
  public releaseYear!: number;

  @IsString({message: PREVIEW_VIDEO.MessageRequired})
  public previewFilePath!: string;

  @IsString({message: VIDEO.MessageRequired})
  public movieFilePath!: string;

  @IsArray({message: ACTORS.MessageValid})
  public actors!: string[];

  @IsString({message: DIRECTOR.MessageRequired})
  @Length(DIRECTOR.Min, DIRECTOR.Max, {message: DIRECTOR.MessageValid})
  public director!: string;

  @IsInt({message: DURATION.MessageValid})
  public durationInMinutes!: number;

  public userId!: string;

  @IsString({message: POSTER.MessageRequired})
  @Matches(/\.(jpg)$/, {message: POSTER.MessageValid})
  public posterFilePath!: string;

  @IsString({message: BG_IMAGE.MessageRequired})
  @Matches(/\.(jpg)$/, {message: BG_IMAGE.MessageValid})
  public backgroundImageFilePath!: string;

  @IsString({message: BG_COLOR.MessageValid})
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {message: BG_COLOR.MessageValid})
  public backgroundColor!: string;

  @IsOptional()
  @IsBoolean({message: PROMO.MessageValid})
  public isPromo?: boolean;
}
