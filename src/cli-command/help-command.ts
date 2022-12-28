import {CliCommandInterface} from './cli-command.interface.js';
import chalk from 'chalk';

const text = chalk.white;
const title = chalk.underline;
const command = chalk.green;
const args = chalk.red;

export class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  execute(): void {
    console.log(text(`Программа для подготовки данных для REST API сервера.
        ${title('Пример:')}
            main.js ${command('--<command>')} ${args('[arguments]')}
        ${title('Команды:')}
            ${command('--version')}:                        #  Выводит номер версии приложения
            ${command('--help')}:                           #  Печатает этот текст
            ${command('--import')} ${args('<filepath>')}:              #  Импортирует данные из TSV`));
  }
}
