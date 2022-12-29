import {CliCommandInterface} from './cli-command.interface.js';
import {readFileSync} from 'fs';

export class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';

  private readVersion(): string {
    const contentPageJSON = readFileSync('./package.json', 'utf-8');
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  public async execute(): Promise<void> {
    console.log(this.readVersion());
  }

}
