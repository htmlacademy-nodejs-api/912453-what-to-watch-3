import {IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Length, Matches} from 'class-validator';
import {MOVIE_VALIDATION} from '../movie-const.js';
import {Genre} from '../../../types/genre.enum.js';

const {TITLE, DESCRIPTION, POSTDATE, GENRE, DIRECTOR, POSTER, BG_IMAGE, BG_COLOR, RELEASE_YEAR,
  PREVIEW_VIDEO, DURATION, ACTORS, VIDEO, PROMO} = MOVIE_VALIDATION;
export class UpdateMovieDto {
  @IsOptional()
  @IsString({message: TITLE.MessageValid})
  @Length(TITLE.Min, TITLE.Max, {message: TITLE.MessageValid})
  public title?: string;

  @IsOptional()
  @IsString({message: DESCRIPTION.MessageValid})
  @Length(DESCRIPTION.Min, DESCRIPTION.Max, {message: DESCRIPTION.MessageValid})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: POSTDATE.MessageValid})
  public postDate?: Date;

  @IsOptional()
  @IsEnum(Genre, {message: GENRE.MessageValid})
  public genre?: string;

  @IsOptional()
  @IsInt({message: RELEASE_YEAR.MessageValid})
  public releaseYear?: number;

  @IsOptional()
  @IsString({message: PREVIEW_VIDEO.MessageValid})
  public previewFilePath?: string;

  @IsOptional()
  @IsString({message: VIDEO.MessageValid})
  public movieFilePath?: string;

  @IsOptional()
  @IsArray({message: ACTORS.MessageValid})
  public actors?: string[];

  @IsOptional()
  @IsString({message: DIRECTOR.MessageValid})
  @Length(DIRECTOR.Min, DIRECTOR.Max, {message: DIRECTOR.MessageValid})
  public director?: string;

  @IsOptional()
  @IsInt({message: DURATION.MessageValid})
  public durationInMinutes?: number;

  @IsOptional()
  @Matches(/\.(jpg)$/, {message: POSTER.MessageValid})
  public posterFilePath?: string;

  @IsOptional()
  @Matches(/\.(jpg)$/, {message: BG_IMAGE.MessageValid})
  public backgroundImageFilePath?: string;

  @IsOptional()
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {message: BG_COLOR.MessageValid})
  public backgroundColor?: string;

  @IsOptional()
  @IsBoolean({message: PROMO.MessageValid})
  public isPromo?: boolean;
}
