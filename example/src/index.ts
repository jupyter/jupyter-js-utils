/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, Jupyter Development Team.
|
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
'use strict';

import {
  showDialog, uuid
} from '../../lib';


function main(): void {
  showDialog({ title: 'Example', body: `uuid is: ${uuid()}` });
}


window.onload = main;
