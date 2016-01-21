// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import expect = require('expect.js');

import {
  getConfigOption
} from '../../lib'


describe('jupyter-js-utils', () => {

  it('should always pass', () => {
    expect(getConfigOption('foo')).to.be('bar');
  });

});
