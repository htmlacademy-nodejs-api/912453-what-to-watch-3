import {CliCommandInterface} from './cli-command.interface.js';
import {TsvFileReader} from '../common/file-reader/tsv-file-reader.js';
import {createMovie} from '../utils/common.js';
import {MovieServiceInterface} from '../modules/movie/movie-service.interface.js';
import {MovieService} from '../modules/movie/movie.service.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import {UserService} from '../modules/user/user.service.js';
import DatabaseService from '../common/database-client/database.service.js';
import {MovieModel} from '../modules/movie/movie.entity.js';
import {UserModel} from '../modules/user/user.entity.js';
import {ConsoleLoggerService} from '../common/logger/console-logger.service.js';
import {Movie} from '../types/movie.type.js';
import {getURI} from '../utils/db.js';
import {CommentModel} from '../modules/comment/comment.entity.js';
import {CommentService} from '../modules/comment/comment.service.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private movieService!: MovieServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.movieService = new MovieService(this.logger, MovieModel, new CommentService(this.logger, CommentModel));
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveMovie(movie: Movie) {
    const user = await this.userService.findOrCreate({
      ...movie.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.movieService.create({
      ...movie,
      userId: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const movie = createMovie(line);
    await this.saveMovie(movie);
    this.logger.info(`Movie "${movie.title}" saved in DB.`);
    resolve();
  }

  private onComplete(count: number) {
    this.logger.info(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    await this.databaseService.connect(uri);

    const fileReader = new TsvFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (error) {
      console.log(`Не удалось импортировать данные из файла, ошибка: "${error}"`);
    }
  }
}
