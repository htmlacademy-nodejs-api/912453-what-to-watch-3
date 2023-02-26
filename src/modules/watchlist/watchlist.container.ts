
import {Container} from 'inversify';
import {WatchlistServiceInterface} from './watchlist-service.interface.js';
import {WatchlistService} from './watchlist.service.js';
import {types} from '@typegoose/typegoose';
import {WatchlistEntity, WatchlistModel } from './watchlist.entity.js';
import {Component} from '../../types/component.types.js';

const watchlistContainer = new Container();

watchlistContainer.bind<WatchlistServiceInterface>(Component.WatchlistServiceInterface).to(WatchlistService).inSingletonScope();
watchlistContainer.bind<types.ModelType<WatchlistEntity>>(Component.WatchlistModel).toConstantValue(WatchlistModel);

export {watchlistContainer};
