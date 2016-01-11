/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, Jupyter Development Team.
|
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
'use strict';
var lib_1 = require('../../lib');
function main() {
    lib_1.showDialog({ title: 'Example', body: "uuid is: " + lib_1.uuid() });
}
window.onload = main;
