import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.types.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {getURI} from '../utils/db.js';
import {MovieServiceInterface} from '../modules/movie/movie-service.interface.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import {CommentServiceInterface} from '../modules/comment/comment-service.interface.js';

@injectable()
export class Application {

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.MovieServiceInterface) private movieService: MovieServiceInterface,
    @inject(Component.UserServiceInterface) private userService: UserServiceInterface,
    @inject(Component.CommentServiceInterface) private commentService: CommentServiceInterface
  ) {}

  public async init() {
    this.logger.info('Application initialisation');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    // Testing
    const movies = await this.movieService.find();
    if(movies[0]) {
      const userId = movies[0].userId?.id.toLocaleString() || '';
      const user = await this.userService.findById(userId);

      await this.commentService.deleteByMovieId(movies[0].id); // Удаляем все комменты, которые попали в базу до перезапуска

      // Добавляем пару комментов с рейтингами
      await this.commentService.create({
        message: 'Hello world! First rating - 5',
        rating: 5,
        userId: user?.id,
        movieId: movies[0].id.toLocaleString()
      });
      await this.commentService.create({
        message: 'Lets add another rating - 10',
        rating: 10,
        userId: user?.id,
        movieId: movies[0].id.toLocaleString()
      });

      // Проверяем корректно ли расчитывается рейтинг на основе 2-х комментариев
      const movie = await this.movieService.calcAndUpdateRating(movies[0].id);
      console.log(movie);
    }
  }
}
