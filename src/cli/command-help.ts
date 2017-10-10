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

import {cliArguments, CliOptions} from './argument-types';


export default async function run(_options: CliOptions) {
  const getUsage = require('command-line-usage');
  const usage = getUsage([
    {
      header: 'modulizer',
      content: `Convert HTML Imports to JavaScript modules

If no GitHub repository names are given, modulizer converts the current
directory as a package. If repositories are provided, they are cloned into a
workspace directory as sibling folders as they would be in a Bower
installation.
`,
    },
    {
      header: 'Options',
      optionList: cliArguments,
    }
  ]);
  console.log(usage);
}