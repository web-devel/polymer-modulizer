/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import * as commandLineArgs from 'command-line-args';

import {cliArguments, CliOptions} from './argument-types';
import runHelpCommand from './command-help';
import runPackageCommand from './command-package';
import runWorkspaceCommand from './command-workspace';

export async function run() {
  const options: CliOptions = commandLineArgs(cliArguments) as any;

  if (options['help']) {
    return runHelpCommand(options);
  }

  if (options['version']) {
    console.log(require('../package.json').version);
    return;
  }

  switch (options.mode) {
    case 'element':
      return runPackageCommand('ELEMENT', options);

      // TODO(fks): Implement!
      // case 'application':
      //   return runPackageCommand('APPLICATION', options);

    case 'workspace':
      return runWorkspaceCommand(options);

    default:
      console.error(`No mode provided! Run "modulizer [mode] [options...]"`);
      console.error(`Available modes: element, workspace`);
      console.error(`Run "modulizer help" for more info.`);
      process.exit(1);
  }
}
