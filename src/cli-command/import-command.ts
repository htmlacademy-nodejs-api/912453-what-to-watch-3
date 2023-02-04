import {CliCommandInterface} from './cli-command.interface.js';
import {TsvFileReader} from '../common/file-reader/tsv-file-reader.js';
import {createMovie} from '../utils/common.js';

export class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const movie = createMovie(line);
    console.log(movie);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }

  public async execute(filename: string): Promise<void> {
    const fileRaader = new TsvFileReader(filename.trim());
    fileRaader.on('line', this.onLine);
    fileRaader.on('end', this.onComplete);

    try {
      await fileRaader.read();
    } catch (error) {
      console.log(`Не удалось импортировать данные из файла, ошибка: "${error}"`);
    }
  }
}
