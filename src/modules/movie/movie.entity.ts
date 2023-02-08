import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';

export interface MovieEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'movies'
  }
})
export class MovieEntity extends defaultClasses.TimeStamps {
  @prop({
    minlength: 2,
    maxlength: 100,
    required: true,
  })
  public title!: string;

  @prop({
    minlength: 20,
    maxlength: 1024,
    required: true,
  })
  public description!: string;

  @prop({
    required: true,
    default: new Date()
  })
  public postDate!: Date;


  @prop({required: true})
  public genre!: string[];

  @prop({required: true})
  public releaseYear!: number;

  @prop({
    required: true,
    default: 0
  })
  public rating!: number;

  @prop({required: true})
  public previewFilePath!: string;

  @prop({required: true})
  public movieFilePath!: string;

  @prop({required: true})
  public actors!: string[];

  @prop({
    minlength: 2,
    maxlength: 50,
    required: true
  })
  public director!: string;

  @prop({required: true})
  public durationInMinutes!: number;

  @prop()
  public commentsCount!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({required: true})
  public posterFilePath!: string;

  @prop({required: true})
  public backgroundImageFilePath!: string;

  @prop({required: true})
  public backgroundColor!: string;
}

export const MovieModel = getModelForClass(MovieEntity);
