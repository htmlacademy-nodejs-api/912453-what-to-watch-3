import {MovieServiceInterface} from './movie-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {MovieEntity} from './movie.entity.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateMovieDto} from './dto/create-movie.dto.js';

@injectable()
export class MovieService implements MovieServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>
  ){}

  public async create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>> {
    const result = await this.movieModel.create(dto);
    this.logger.info(`Movie "${dto.title}" created.`);

    return result;
  }

  findByMovieId(id: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel.findOne({id}).exec();
  }
}
