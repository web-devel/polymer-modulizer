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
import {Iterable as IterableX} from 'ix';
import * as fs from 'mz/fs';
import * as path from 'path';

import util = require('util');
import _mkdirp = require('mkdirp');
import _rimraf = require('rimraf');

import {ConvertedDocumentFilePath} from './urls/types';

/**
 * Helper promisified "mkdirp" library function.
 */
export const mkdirp = util.promisify(_mkdirp);

/**
 * Helper promisified "rimraf" library function.
 */
export const rimraf = util.promisify(_rimraf);


/**
 * Write each file to the out-directory.
 */
export async function writeFileResults(
    outDir: string, files: Map<ConvertedDocumentFilePath, string|undefined>) {
  return Promise.all(IterableX.from(files).map(async ([newPath, newSource]) => {
    const filePath = path.join(outDir, newPath);
    await mkdirp(path.dirname(filePath));
    if (newSource !== undefined) {
      await fs.writeFile(filePath, newSource);
    } else if (await fs.exists(filePath)) {
      await fs.unlink(filePath);
    }
  }));
}
