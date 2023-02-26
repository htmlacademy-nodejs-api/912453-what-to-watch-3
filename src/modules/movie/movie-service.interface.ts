import {CreateMovieDto} from './dto/create-movie.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {MovieEntity} from './movie.entity.js';
import {UpdateMovieDto} from './dto/update-movie.dto.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';

export interface MovieServiceInterface extends DocumentExistsInterface {
  create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>>;
  findByMovieId(id: string): Promise<DocumentType<MovieEntity> | null>;
  find(count?: number): Promise<DocumentType<MovieEntity>[]>;
  findByMovieTitle(title: string): Promise<DocumentType<MovieEntity> | null>;
  findByMovieGenre(genre: string, count?: number): Promise<DocumentType<MovieEntity>[]>;
  findPromo(count?: number): Promise<DocumentType<MovieEntity>[]>;
  updateById(movieId: string, dto: UpdateMovieDto): Promise<DocumentType<MovieEntity> | null>;
  deleteById(movieId: string): Promise<DocumentType<MovieEntity> | null>;
  incCommentCount(movieId: string): Promise<DocumentType<MovieEntity> | null>;
  calcAndUpdateRating(movieId: string): Promise<DocumentType<MovieEntity> | null>;
}
