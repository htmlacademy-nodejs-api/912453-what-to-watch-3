import {CreateCommentDto} from './dto/create-comment.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';

export interface CommentServiceInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByMovieId(id: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByMovieId(movieId: string): Promise<number>
}
