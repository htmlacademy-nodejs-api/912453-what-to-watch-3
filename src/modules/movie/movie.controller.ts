import {Controller} from '../../common/controller/controller.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {Component} from '../../types/component.types.js';
import {MovieServiceInterface} from './movie-service.interface.js';
import {fillDTO} from '../../utils/common.js';
import {MovieResponse} from './response/movie.response.js';
import {CreateMovieDto} from './dto/create-movie.dto.js';
import {Genre} from '../../types/genre.enum.js';
import {HttpError} from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';

@injectable()
export class MovieController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.MovieServiceInterface) private readonly movieService: MovieServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.createMovie});
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getMovies});
    this.addRoute({path: '/:movieId', method: HttpMethod.Patch, handler: this.updateMovie});
    this.addRoute({path: '/:movieId', method: HttpMethod.Delete, handler: this.deleteMovie});
    this.addRoute({path: '/:movieId', method: HttpMethod.Get, handler: this.getMovieInfo});
    this.addRoute({path: '/promo', method: HttpMethod.Get, handler: this.getPromo});
  }

  public async createMovie(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateMovieDto>,
    res: Response
  ): Promise<void> {
    const existMovie = await this.movieService.findByMovieTitle(body.title);
    if(existMovie) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Movie with title «${body.title}» exists.`,
        'MovieController'
      );
    }
    const result = await this.movieService.create(body);
    this.created(res, fillDTO(MovieResponse, result));
  }


  public async getMovies({query}: Request, res: Response): Promise<void> {
    const count = Number(query.count) || undefined;
    let result;
    if(typeof query.genre === 'string' && query.genre in Genre) {
      result = await this.movieService.findByMovieGenre(query.genre, count ?? 60);
    } else {
      result = await this.movieService.find();
    }
    if(!result) {
      throw new Error('No movies');
    }
    this.ok(res, fillDTO(MovieResponse, result));
  }


  public async updateMovie({ body, params }: Request, res: Response): Promise<void> {
    const movie = await this.movieService.findByMovieId(params.movieId);
    if (!movie) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Movie with id: ${params.movieId} is not found.`,
        'MovieController'
      );
    }
    const updatedMovie = await this.movieService.updateById(params.movieId, body);
    this.ok(res, fillDTO(MovieResponse, updatedMovie));
  }


  public async deleteMovie({params}: Request, res: Response): Promise<void> {
    const movie = await this.movieService.findByMovieId(params.movieId);
    if (!movie) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Movie with id: ${params.movieId} is not found.`,
        'MovieController'
      );
    }
    const deletedMovie = await this.movieService.deleteById(params.movieId);
    this.ok(res, fillDTO(MovieResponse, deletedMovie));
  }


  public async getMovieInfo({params}: Request, res: Response): Promise<void> {
    const {movieId} = params;
    const movie = await this.movieService.findByMovieId(movieId);
    if(!movie) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Movie with id: ${params.movieId} is not found.`,
        'MovieController'
      );
    }

    this.ok(res, fillDTO(MovieResponse, movie));
  }


  public getPromo({query}: Request, res: Response): void {
    const count = Number(query?.count) || undefined;
    const result = this.movieService.findPromo(count);
    if (!result) {
      throw new HttpError(
        StatusCodes.NO_CONTENT,
        'There is no promo movies.',
        'CategoryController'
      );
    }
    this.ok(res, fillDTO(MovieResponse, result));
  }
}
