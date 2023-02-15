import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {MovieEntity} from '../movie/movie.entity.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {

  @prop({
    required: true,
    trim: true
  })
  public message!: string;

  @prop({required: true})
  public rating!: number;

  @prop({
    required: true,
    ref: UserEntity
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: true,
    ref: MovieEntity
  })
  public movieId!: Ref<MovieEntity>;

  @prop({required: true})
  public postDate!: Date;
}

export const CommentModel = getModelForClass(CommentEntity);
