import {Container} from 'inversify';
import {MovieServiceInterface} from './movie-service.interface.js';
import {Component} from '../../types/component.types.js';
import {MovieEntity, MovieModel} from './movie.entity.js';
import {types} from '@typegoose/typegoose';
import {MovieService} from './movie.service.js';

const movieContainer = new Container();

movieContainer.bind<MovieServiceInterface>(Component.MovieServiceInterface).to(MovieService).inSingletonScope();
movieContainer.bind<types.ModelType<MovieEntity>>(Component.MovieModel).toConstantValue(MovieModel);

export {movieContainer};
