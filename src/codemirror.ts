// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.'use strict';

import * as CodeMirror
  from 'codemirror';

// Bundle common modes
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/julia/julia';
import 'codemirror/mode/r/r';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';


/**
 * Load a codemirror mode by file name.
 */
export
function loadModeByFileName(editor: CodeMirror.Editor, filename: string): Promise<void> {
  return loadMode(editor, CodeMirror.findModeByFileName(filename));
}


/**
 * Load a codemirror mode by mode name.
 */
export
function loadModeByName(editor: CodeMirror.Editor, mode: string): Promise<void> {
  return loadMode(editor, CodeMirror.findModeByName(mode));
}


/**
 * Load a codemirror mode by mime type.
 */
export
function loadModeByMIME(editor: CodeMirror.Editor, mime: string): Promise<void> {
  return loadMode(editor, CodeMirror.findModeByMIME(mime));
}


/**
 * Load a fully resolved mode.
 */
function loadMode(editor: CodeMirror.Editor, spec: CodeMirror.modespec): Promise<void> {
  if (!spec) {
    editor.setOption('mode', 'null');
    return Promise.resolve(void 0);
  }
  if (CodeMirror.modes.hasOwnProperty(spec.mode)) {
    editor.setOption('mode', spec.mime);
    return Promise.resolve(void 0);
  } else {
    // Load the remaining mode bundle asynchronously.
    require([`codemirror/mode/${spec.mode}/${spec.mode}.js`], () => {
      editor.setOption('mode', spec.mime);
      return Promise.resolve(void 0);
    });
  }
}
