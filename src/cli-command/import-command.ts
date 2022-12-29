import {CliCommandInterface} from './cli-command.interface.js';
import {TsvFileReader} from '../common/file-reader/tsv-file-reader.js';

export class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  public execute(filename: string): void {
    const fileRaader = new TsvFileReader(filename.trim());

    try {
      fileRaader.read();
      console.log(fileRaader.toArray());
    } catch (error) {
      console.log(`Не удалось импортировать данные из файла, ошибка: "${error}"`);
    }
  }
}
