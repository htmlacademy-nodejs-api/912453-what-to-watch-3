import {CliCommandInterface} from './cli-command.interface.js';
import {MockData} from '../types/mock-data.type.js';
import got from 'got';
import {MovieGenerator} from '../common/movie-generator/movie-generator.js';
import {TsvFileWriter} from '../common/file-writer/tsv-file-writer.js';

export class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const moviesCount = Number.parseInt(count, 10);

    try {
      this.initData = await got.get(url).json();
    } catch (error) {
      return console.log(`Cant fetch data from url: ${url} ...error: ${error}`);
    }

    const movieGeneratorString = new MovieGenerator(this.initData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < moviesCount; i++) {
      await tsvFileWriter.write(movieGeneratorString.generate());
    }

    console.log(`File ${filepath} was successfully created!`);
  }
}
