/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*-----------------------------------------------------------------------------
	| Copyright (c) 2014-2015, Jupyter Development Team.
	|
	| Distributed under the terms of the Modified BSD License.
	|----------------------------------------------------------------------------*/
	'use strict';
	var lib_1 = __webpack_require__(1);
	function main() {
	    lib_1.showDialog({ title: 'Example', body: "uuid is: " + lib_1.uuid() });
	}
	window.onload = main;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) Jupyter Development Team.
	// Distributed under the terms of the Modified BSD License.
	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(7));
	//# sourceMappingURL=index.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) Jupyter Development Team.
	// Distributed under the terms of the Modified BSD License.'use strict';
	__webpack_require__(3);
	/**
	 * The class name added to dialog instances.
	 */
	var DIALOG_CLASS = 'jp-Dialog';
	/**
	 * The class name added to dialog content node.
	 */
	var CONTENT_CLASS = 'jp-Dialog-content';
	/**
	 * The class name added to dialog header node.
	 */
	var HEADER_CLASS = 'jp-Dialog-header';
	/**
	 * The class name added to dialog title node.
	 */
	var TITLE_CLASS = 'jp-Dialog-title';
	/**
	 * The class name added to dialog close icon node.
	 */
	var CLOSE_ICON_CLASS = 'jp-Dialog-close';
	/**
	 * The class name added to dialog body node.
	 */
	var BODY_CLASS = 'jp-Dialog-body';
	/**
	 * The class name added to a dialog content node.
	 */
	var FOOTER_CLASS = 'jp-Dialog-footer';
	/**
	 * The class name added to a dialog button node.
	 */
	var BUTTON_CLASS = 'jp-Dialog-button';
	/**
	 * The class name added to a dialog button icon node.
	 */
	var BUTTON_ICON_CLASS = 'jp-Dialog-buttonIcon';
	/**
	 * The class name added to a dialog button text node.
	 */
	var BUTTON_TEXT_CLASS = 'jp-Dialog-buttonText';
	/*
	 * The class name added to dialog OK buttons.
	 */
	var OK_BUTTON_CLASS = 'jp-Dialog-okButton';
	/**
	 * The class name added to dialog Cancel buttons.
	 */
	var CANCEL_BUTTON_CLASS = 'jp-Dialog-cancelButton';
	/**
	 * A default "OK" button.
	 */
	exports.okButton = {
	    text: 'OK',
	    className: OK_BUTTON_CLASS
	};
	/**
	 * A default "Cancel" button.
	 */
	exports.cancelButton = {
	    text: 'Cancel',
	    className: CANCEL_BUTTON_CLASS
	};
	/**
	 * Create a dialog and show it.
	 *
	 * @param options - The dialog setup options.
	 *
	 * @returns The button item that was selected.
	 */
	function showDialog(options) {
	    var host = options.host || document.body;
	    var buttons = options.buttons || [exports.okButton, exports.cancelButton];
	    var buttonNodes = buttons.map(createButton);
	    var dialog = createDialog(options, buttonNodes);
	    host.appendChild(dialog);
	    buttonNodes[0].focus();
	    return new Promise(function (resolve, reject) {
	        buttonNodes.map(function (node) {
	            node.addEventListener('click', function (evt) {
	                if (node.contains(evt.target)) {
	                    host.removeChild(dialog);
	                    var button = buttons[buttonNodes.indexOf(node)];
	                    if (button.command && button.command.isEnabled) {
	                        button.command.execute(button.commandArgs);
	                    }
	                    resolve(button);
	                }
	            });
	        });
	        dialog.addEventListener('keydown', function (evt) {
	            // Check for escape key
	            if (evt.keyCode === 27) {
	                host.removeChild(dialog);
	                resolve(null);
	            }
	        });
	        dialog.addEventListener('contextmenu', function (evt) {
	            evt.preventDefault();
	            evt.stopPropagation();
	        });
	        var close = dialog.getElementsByClassName(CLOSE_ICON_CLASS)[0];
	        close.addEventListener('click', function () {
	            host.removeChild(dialog);
	            resolve(null);
	        });
	    });
	}
	exports.showDialog = showDialog;
	/**
	 * Create the dialog node.
	 */
	function createDialog(options, buttonNodes) {
	    // Create the dialog nodes (except for the buttons).
	    var node = document.createElement('div');
	    var content = document.createElement('div');
	    var header = document.createElement('div');
	    var body = document.createElement('div');
	    var footer = document.createElement('div');
	    var title = document.createElement('span');
	    var close = document.createElement('span');
	    node.className = DIALOG_CLASS;
	    content.className = CONTENT_CLASS;
	    header.className = HEADER_CLASS;
	    body.className = BODY_CLASS;
	    footer.className = FOOTER_CLASS;
	    title.className = TITLE_CLASS;
	    close.className = CLOSE_ICON_CLASS;
	    node.appendChild(content);
	    content.appendChild(header);
	    content.appendChild(body);
	    content.appendChild(footer);
	    header.appendChild(title);
	    header.appendChild(close);
	    // Populate the nodes.
	    title.textContent = options.title || '';
	    if (options.body && typeof options.body === 'string') {
	        var span = document.createElement('span');
	        span.innerHTML = options.body;
	        body.appendChild(span);
	    }
	    else if (options.body) {
	        body.appendChild(options.body);
	    }
	    buttonNodes.map(function (buttonNode) { footer.appendChild(buttonNode); });
	    return node;
	}
	/**
	 * Create a node for a button item.
	 */
	function createButton(item) {
	    var button = document.createElement('button');
	    button.className = BUTTON_CLASS;
	    if (item.className)
	        button.classList.add(item.className);
	    var icon = document.createElement('span');
	    icon.className = BUTTON_ICON_CLASS;
	    if (item.icon)
	        icon.classList.add(item.icon);
	    var text = document.createElement('span');
	    text.className = BUTTON_TEXT_CLASS;
	    text.textContent = item.text;
	    button.appendChild(icon);
	    button.appendChild(text);
	    return button;
	}
	//# sourceMappingURL=dialog.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./dialog.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./dialog.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "/*-----------------------------------------------------------------------------\n| Copyright (c) 2014-2016, Jupyter Development Team.\n|\n| Distributed under the terms of the Modified BSD License.\n|----------------------------------------------------------------------------*/\n.jp-Dialog {\n  position: absolute;\n  z-index: 10000;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  top: 0px;\n  left: 0px;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n}\n\n\n.jp-Dialog-content {\n  margin-left: auto;\n  margin-right: auto;\n  text-align: center;\n  vertical-align: middle;\n}\n\n\n.jp-Dialog-footer {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n}\n\n\n.jp-Dialog-button {\n  flex: 1 1 auto;\n}\n\n\n.jp-Dialog-buttonIcon {\n\n}\n\n.jp-Dialog-buttonText {\n}\n\n\n.jp-Dialog-header {\n  display: flex;\n  flex-direction: row;\n}\n\n.jp-Dialog-title {\n  flex: 1 1 auto;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n\n.jp-Dialog-close {\n  flex: 0 0 auto;\n}\n\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright (c) Jupyter Development Team.
	// Distributed under the terms of the Modified BSD License.
	'use strict';
	/**
	 * Copy the contents of one object to another, recursively.
	 *
	 * From [stackoverflow](http://stackoverflow.com/a/12317051).
	 */
	function extend(target, source) {
	    target = target || {};
	    for (var prop in source) {
	        if (typeof source[prop] === 'object') {
	            target[prop] = extend(target[prop], source[prop]);
	        }
	        else {
	            target[prop] = source[prop];
	        }
	    }
	    return target;
	}
	exports.extend = extend;
	/**
	 * Get a copy of an object, or null.
	 */
	function copy(object) {
	    if (object !== null && typeof object === 'object') {
	        return JSON.parse(JSON.stringify(object));
	    }
	    return null;
	}
	exports.copy = copy;
	/**
	 * Get a random 128b hex string (not a formal UUID)
	 */
	function uuid() {
	    var s = [];
	    var hexDigits = "0123456789abcdef";
	    var nChars = hexDigits.length;
	    for (var i = 0; i < 32; i++) {
	        s[i] = hexDigits.charAt(Math.floor(Math.random() * nChars));
	    }
	    return s.join("");
	}
	exports.uuid = uuid;
	/**
	 * Join a sequence of url components with `'/'`.
	 */
	function urlPathJoin() {
	    var paths = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        paths[_i - 0] = arguments[_i];
	    }
	    var url = '';
	    for (var i = 0; i < paths.length; i++) {
	        var path = paths[i];
	        if (path === '') {
	            continue;
	        }
	        if (i > 0) {
	            path = path.replace(/\/\/+/, '/');
	        }
	        if (url.length > 0 && url.charAt(url.length - 1) != '/') {
	            url = url + '/' + paths[i];
	        }
	        else {
	            url = url + paths[i];
	        }
	    }
	    return url;
	}
	exports.urlPathJoin = urlPathJoin;
	/**
	 * Encode just the components of a multi-segment uri.
	 *
	 * Preserves the `'/'` separators.
	 */
	function encodeURIComponents(uri) {
	    return uri.split('/').map(encodeURIComponent).join('/');
	}
	exports.encodeURIComponents = encodeURIComponents;
	/**
	 * Encode and join a sequence of url components with `'/'`.
	 */
	function urlJoinEncode() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
	    }
	    return encodeURIComponents(urlPathJoin.apply(null, args));
	}
	exports.urlJoinEncode = urlJoinEncode;
	/**
	 * Return a serialized object string suitable for a query.
	 *
	 * From [stackoverflow](http://stackoverflow.com/a/30707423).
	 */
	function jsonToQueryString(json) {
	    return '?' + Object.keys(json).map(function (key) {
	        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
	    }).join('&');
	}
	exports.jsonToQueryString = jsonToQueryString;
	/**
	 * Asynchronous XMLHTTPRequest handler.
	 *
	 * @param url - The url to request.
	 *
	 * @param settings - The settings to apply to the request and response.
	 *
	 * #### Notes
	 * Based on this [example](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest).
	 */
	function ajaxRequest(url, settings) {
	    var method = settings.method || 'GET';
	    var user = settings.user || '';
	    var password = settings.password || '';
	    if (!!settings.cache) {
	        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache.
	        url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
	    }
	    return new Promise(function (resolve, reject) {
	        var req = new XMLHttpRequest();
	        req.open(method, url, true, user, password);
	        if (settings.contentType !== void 0) {
	            req.setRequestHeader('Content-Type', settings.contentType);
	        }
	        if (settings.timeout !== void 0)
	            req.timeout = settings.timeout;
	        if (!!settings.withCredentials) {
	            req.withCredentials = true;
	        }
	        if (settings.requestHeaders !== void 0) {
	            for (var prop in settings.requestHeaders) {
	                req.setRequestHeader(prop, settings.requestHeaders[prop]);
	            }
	        }
	        req.onload = function () {
	            if (req.status >= 400) {
	                var error = new Error(req.statusText);
	                reject({ xhr: req, statusText: req.statusText, error: error });
	                return;
	            }
	            var response = req.responseText;
	            if (settings.dataType === 'json' && response) {
	                response = JSON.parse(response);
	            }
	            resolve({ data: response, statusText: req.statusText, xhr: req });
	        };
	        req.onerror = function (err) {
	            reject({ xhr: req, statusText: req.statusText, error: err });
	        };
	        req.ontimeout = function () {
	            reject({ xhr: req, statusText: req.statusText,
	                error: new Error('Operation Timed Out') });
	        };
	        if (settings.data) {
	            req.send(settings.data);
	        }
	        else {
	            req.send();
	        }
	    });
	}
	exports.ajaxRequest = ajaxRequest;
	/**
	 * A Promise that can be resolved or rejected by another object.
	 */
	var PromiseDelegate = (function () {
	    /**
	     * Construct a new Promise delegate.
	     */
	    function PromiseDelegate() {
	        var _this = this;
	        this._promise = new Promise(function (resolve, reject) {
	            _this._resolve = resolve;
	            _this._reject = reject;
	        });
	    }
	    Object.defineProperty(PromiseDelegate.prototype, "promise", {
	        /**
	         * Get the underlying Promise.
	         */
	        get: function () {
	            return this._promise;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Resolve the underlying Promise with an optional value or another Promise.
	     */
	    PromiseDelegate.prototype.resolve = function (value) {
	        // Note: according to the Promise spec, and the `this` context for resolve
	        // and reject are ignored
	        this._resolve(value);
	    };
	    /**
	     * Reject the underlying Promise with an optional reason.
	     */
	    PromiseDelegate.prototype.reject = function (reason) {
	        // Note: according to the Promise spec, the `this` context for resolve
	        // and reject are ignored
	        this._reject(reason);
	    };
	    return PromiseDelegate;
	})();
	exports.PromiseDelegate = PromiseDelegate;
	/**
	 * Global config data for the Jupyter application.
	 */
	var configData = null;
	/**
	 *  Make an object fully immutable by freezing each object in it.
	 */
	function deepFreeze(obj) {
	    // Freeze properties before freezing self
	    Object.getOwnPropertyNames(obj).forEach(function (name) {
	        var prop = obj[name];
	        // Freeze prop if it is an object
	        if (typeof prop == 'object' && prop !== null && !Object.isFrozen(prop))
	            deepFreeze(prop);
	    });
	    // Freeze self
	    return Object.freeze(obj);
	}
	function getConfigOption(name) {
	    if (configData) {
	        return configData[name];
	    }
	    var el = document.getElementById('jupyter-config-data');
	    if (!el) {
	        return void 0;
	    }
	    configData = deepFreeze(JSON.parse(el.textContent));
	    return configData[name];
	}
	exports.getConfigOption = getConfigOption;
	/**
	 * Get the base URL for a Jupyter application.
	 */
	function getBaseUrl() {
	    var baseUrl = getConfigOption('baseUrl');
	    if (baseUrl === void 0) {
	        baseUrl = (typeof location === 'undefined' ?
	            'http://localhost:8888/' : location.origin + '/');
	    }
	    return baseUrl;
	}
	exports.getBaseUrl = getBaseUrl;
	/**
	 * Get the base websocket URL for a Jupyter application.
	 */
	function getWsUrl() {
	    var wsUrl = getConfigOption('wsUrl');
	    if (wsUrl === void 0) {
	        wsUrl = 'ws' + getBaseUrl().slice(4);
	    }
	    return wsUrl;
	}
	exports.getWsUrl = getWsUrl;
	//# sourceMappingURL=misc.js.map

/***/ }
/******/ ]);