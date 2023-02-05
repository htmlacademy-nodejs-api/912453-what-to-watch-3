import {ConfigInterface} from './config.interface.js';
import {config} from 'dotenv';
import {LoggerInterface} from '../logger/logger.interface.js';
import {ConfigSchema, configSchema} from './config.schema.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';

@injectable()
export class ConfigService implements ConfigInterface {
  private readonly config: ConfigSchema;

  constructor(@inject(Component.LoggerInterface) private logger: LoggerInterface) {
    const parseOutput = config();

    if(parseOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof ConfigSchema>(key: T) {
    return this.config[key];
  }
}
