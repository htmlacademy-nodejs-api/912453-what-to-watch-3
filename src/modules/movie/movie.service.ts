import {MovieServiceInterface} from './movie-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {MovieEntity} from './movie.entity.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateMovieDto} from './dto/create-movie.dto.js';
import {UpdateMovieDto} from './dto/update-movie.dto.js';
import {SortType} from '../../types/sort-type.enum.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import {CommentEntity} from '../comment/comment.entity.js';

const DEFAULT = {
  MOVIES_COUNT: 60,
  RATING_ACCURACY: 1
};

@injectable()
export class MovieService implements MovieServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ){}

  public async create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>> {
    const result = await this.movieModel.create(dto);
    this.logger.info(`Movie "${dto.title}" created.`);
    return result;
  }

  public async findByMovieId(_id: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findOne({_id})
      .populate(['userId'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<MovieEntity>[]> {
    return this.movieModel
      .find()
      .limit(count ?? DEFAULT.MOVIES_COUNT)
      .populate(['userId'])
      .exec();
  }

  public async updateById(movieId: string, dto: UpdateMovieDto): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndUpdate(movieId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    await this.commentService.deleteByMovieId(movieId);
    return this.movieModel.findByIdAndDelete(movieId).exec();
  }

  public async findByMovieTitle(title: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findOne({ title })
      .exec();
  }

  public async getWatchlistByUserId(userId: string): Promise<DocumentType<MovieEntity>[]> {
    return this.movieModel.find({userId}).exec(); // Это заглушка пока не реализую логику на пользователе
  }

  public async findByMovieGenre(genre: string, count?: number): Promise<DocumentType<MovieEntity>[]> {
    return this.movieModel
      .find({'genre': genre})
      .populate('userId')
      .sort({'postDate': SortType.Down})
      .limit(count ?? DEFAULT.MOVIES_COUNT)
      .exec();
  }

  public async findPromo(count?: number): Promise<DocumentType<MovieEntity>[]> {
    return this.movieModel
      .find({'isPromo' : true})
      .populate('userId')
      .sort({'postDate': SortType.Down})
      .limit(count ?? DEFAULT.MOVIES_COUNT)
      .exec();
  }

  public async incCommentCount(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndUpdate(movieId, {
        '$inc': {
          commentsCount: 1,
        }
      }).exec();
  }

  public async calcAndUpdateRating(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    const comments = await this.commentService.findByMovieId(movieId);
    const ratings = comments.map((comment: DocumentType<CommentEntity>) => comment.rating)
      .reduce((summ: number, next: number) => summ + next);
    const rating = Number((ratings / comments.length).toFixed(DEFAULT.RATING_ACCURACY));
    return this.updateById(movieId, {rating});
  }
}
