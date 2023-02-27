import {inject, injectable} from 'inversify';
import {WatchlistServiceInterface} from './watchlist-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {WatchlistEntity} from './watchlist.entity.js';

@injectable()
export class WatchlistService implements WatchlistServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.WatchlistModel) private readonly watchlistModel: types.ModelType<WatchlistEntity>
  ) {}

  public async add(movieId: string, userId: string): Promise<DocumentType<WatchlistEntity> | null> {
    const watchlist = await this.watchlistModel.findOne({ userId });
    if (!watchlist) {
      this.logger.info(`Created new watchlist by user(id=${userId}) with movie(id=${movieId})`);
      return await this.watchlistModel.create({userId, movieIds: [movieId]});
    }
    if (!watchlist.movieIds.find((id) => id?.toString() === movieId)) {
      const movieIds = [...watchlist.movieIds, movieId];
      this.logger.info(`User(id=${userId}) added movie(id=${movieId}) to watchlist`);
      return this.watchlistModel.findOneAndUpdate({userId}, {userId, movieIds}, {new: true});
    }

    return watchlist;
  }

  public async remove(movieId: string, userId: string): Promise<DocumentType<WatchlistEntity> | null> {
    const watchlist = await this.watchlistModel.findOne({userId});
    if (watchlist) {
      const index = watchlist.movieIds.findIndex((id) => id?.toString() === movieId);
      if (index !== -1) {
        const movieIds = [...watchlist.movieIds];
        movieIds.splice(index, 1);
        return this.watchlistModel.findOneAndUpdate({userId}, {userId, movieIds}, {new: true});
      }
      return null;
    }
    return null;
  }
}
