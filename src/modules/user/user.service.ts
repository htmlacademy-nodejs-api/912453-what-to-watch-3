import {UserServiceInterface} from './user-service.interface.js';
import {UserEntity} from './user.entity.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateUserDto} from './dto/create-user.dto.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {UpdateUserDto} from './dto/update-user.dto.js';

@injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({userId});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, {new: true}).exec();
  }

  public async addMovieToWatchlist(userId: string, movieId: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findById(userId);
    const watchlist = user?.watchlist ?? [];
    if (!watchlist.includes(movieId)) {
      return await this.userModel.findByIdAndUpdate(userId, {watchlist: [...watchlist, movieId]}, {new: true}).exec();
    }
    return user;
  }

  public async removeMovieFromWatchlist(userId: string, movieId: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findById(userId);
    const watchlist = user?.watchlist ?? [];
    const index = watchlist.indexOf(movieId);
    if (index > -1) {
      watchlist.splice(index, 1);
      return await this.userModel.findByIdAndUpdate(userId, {watchlist}, {new: true}).exec();
    }
    return user;
  }
}
