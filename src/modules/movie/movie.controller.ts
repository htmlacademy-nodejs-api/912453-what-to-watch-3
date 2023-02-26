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
import {ValidateObjectMiddleware} from '../../common/middlewares/validate-object.middleware.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {UpdateMovieDto} from './dto/update-movie.dto.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import {MovieShortResponse} from './response/movie-short.response.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import {WatchlistServiceInterface} from '../watchlist/watchlist-service.interface.js';
import {DEFAULT} from './movie-const.js';

@injectable()
export class MovieController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.MovieServiceInterface) private readonly movieService: MovieServiceInterface,
    @inject(Component.WatchlistServiceInterface) private readonly watchlistService: WatchlistServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateMovieDto)
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index}
    );
    this.addRoute({
      path: '/:movieId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectMiddleware('movieId'),
        new ValidateDtoMiddleware(UpdateMovieDto),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute({
      path: '/:movieId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute({
      path: '/:movieId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute({
      path: '/lists/promo',
      method: HttpMethod.Get,
      handler: this.getPromo
    });
    this.addRoute({
      path: '/watchlist/:movieId/:add',
      method: HttpMethod.Post,
      handler: this.addToWatchlist,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async create(
    {body, user}: Request<Record<string, unknown>, Record<string, unknown>, CreateMovieDto>,
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
    const result = await this.movieService.create({...body, userId: user.id});
    this.created(res, fillDTO(MovieResponse, result));
  }


  public async index({query}: Request, res: Response): Promise<void> {
    const count = Number(query.count) || DEFAULT.MOVIES_COUNT;
    console.log(count, ' фльмов в выдаче');
    let result;
    if(typeof query.genre === 'string' && query.genre in Genre) {
      result = await this.movieService.findByMovieGenre(query.genre, count);
    } else if(query.type === 'favorite') {
      this.logger.warn('Not implemented!');
    } else {
      result = await this.movieService.find(count);
    }
    if(!result) {
      throw new Error('No movies');
    }
    this.ok(res, fillDTO(MovieShortResponse, result));
  }


  public async update({ body, params, user }: Request, res: Response): Promise<void> {
    const updatedMovie = await this.movieService.updateById(params.movieId, {...body, userId: user.id});
    this.ok(res, fillDTO(MovieResponse, updatedMovie));
  }


  public async delete({params}: Request, res: Response): Promise<void> {
    const deletedMovie = await this.movieService.deleteById(params.movieId);
    this.ok(res, fillDTO(MovieResponse, deletedMovie));
  }


  public async show({params}: Request, res: Response): Promise<void> {
    const {movieId} = params;
    const movie = await this.movieService.findByMovieId(movieId);
    this.ok(res, fillDTO(MovieResponse, movie));
  }


  public async getPromo({query}: Request, res: Response): Promise<void> {
    const count = Number(query?.count) || undefined;
    const result = await this.movieService.findPromo(count);
    this.ok(res, fillDTO(MovieResponse, result));
  }


  public async addToWatchlist({user, params}: Request, res: Response): Promise<void> {
    if(params.add === 'true') {
      const result = await this.watchlistService.add(params.movieId, user.id);
      this.ok(res, {watchlist: result?.movieIds});
    }
    if(params.add === 'false') {
      const result = await this.watchlistService.remove(params.movieId, user.id);
      this.ok(res, {watchlist: result?.movieIds});
    }
  }
}
