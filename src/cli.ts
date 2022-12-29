#!/usr/bin/env node

import {CliApplication} from './app/cli-application.js';
import {HelpCommand} from './cli-command/help-command.js';
import {ImportCommand} from './cli-command/import-command.js';
import {VersionCommand} from './cli-command/version-command.js';

const myCliAppManager = new CliApplication();
myCliAppManager.registerCommands([new HelpCommand(), new VersionCommand(), new ImportCommand()]);
myCliAppManager.processCommand(process.argv);
