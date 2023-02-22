import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {UserServiceInterface} from './user-service.interface.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {HttpError} from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import {UserResponse} from './response/user.response.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {LoginUserDto} from './dto/login-user.dto.js';

@injectable()
export class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface
  ) {
    super(logger);

    this.logger.info('Register routes for UserController…');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.register});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.getStatus});
    this.addRoute({path: '/avatar/:userId', method: HttpMethod.Post, handler: this.uploadAvatar});
  }

  public async register(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserResponse, result));
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController - trying to login',
    );
  }

  public async getStatus(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController - user trying to check auth status',
    );
  }

  public async uploadAvatar(req: Request, _res: Response): Promise<void> {
    const {userId} = req.params;
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      `UserController - trying to upload avatar to user(id:${userId})`,
    );
  }
}
