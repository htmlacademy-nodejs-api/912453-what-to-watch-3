import { DocumentType } from '@typegoose/typegoose';
import { WatchlistEntity } from './watchlist.entity.js';

export interface WatchlistServiceInterface {
  add(movieId: string, userId: string): Promise<DocumentType<WatchlistEntity> | null>;
  remove(movieId: string, userId: string): Promise<DocumentType<WatchlistEntity> | null>;
}
