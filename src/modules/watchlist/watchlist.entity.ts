

import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.entity.js';
import {MovieEntity} from '../movie/movie.entity.js';

const { prop, modelOptions } = typegoose;

export interface WatchlistEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'watchlist'
  }
})

export class WatchlistEntity extends defaultClasses.TimeStamps {
  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    ref: MovieEntity,
    required: true
  })
  public movieIds!: Ref<MovieEntity>[];
}

export const WatchlistModel = getModelForClass(WatchlistEntity);
