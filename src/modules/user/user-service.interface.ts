import {CreateUserDto} from './dto/create-user.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from './user.entity.js';
import {UpdateUserDto} from './dto/update-user.dto.js';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail(userEmail: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  addMovieToWatchlist(userId: string, movieId: string): Promise<DocumentType<UserEntity> | null>;
  removeMovieFromWatchlist(userId: string, movieId: string): Promise<DocumentType<UserEntity> | null>;
}
