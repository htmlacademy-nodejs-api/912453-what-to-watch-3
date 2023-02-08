import {CreateMovieDto} from './dto/create-movie.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {MovieEntity} from './movie.entity.js';

export interface MovieServiceInterface {
  create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>>;
  findByMovieId(id: string): Promise<DocumentType<MovieEntity> | null>;
}
