import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.types.js';

@injectable()
export class Application {

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface
  ) {}

  public async init() {
    this.logger.info('Application initialisation');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}