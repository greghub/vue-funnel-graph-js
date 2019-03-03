(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FunnelGraph"] = factory();
	else
		root["FunnelGraph"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0787":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0fc9":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1654":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("71c1")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("30f1")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "1691":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "1af6":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__("63b6");

$export($export.S, 'Array', { isArray: __webpack_require__("9003") });


/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "20fd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "241e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "25eb":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "30f1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var $iterCreate = __webpack_require__("8f60");
var setToStringTag = __webpack_require__("45f2");
var getPrototypeOf = __webpack_require__("53e2");
var ITERATOR = __webpack_require__("5168")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "32fc":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("e53d").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "335c":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6b4c");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "36c3":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("335c");
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "3702":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("481b");
var ITERATOR = __webpack_require__("5168")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a38":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "40c3":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("6b4c");
var TAG = __webpack_require__("5168")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4362":
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
	setTimeout(fn, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__("df7c");
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "45f2":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("d9f6").f;
var has = __webpack_require__("07e3");
var TAG = __webpack_require__("5168")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "481b":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4ee1":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("5168")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "50ed":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "5168":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("dbdb")('wks');
var uid = __webpack_require__("62a0");
var Symbol = __webpack_require__("e53d").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "53e2":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("07e3");
var toObject = __webpack_require__("241e");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "549b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("d864");
var $export = __webpack_require__("63b6");
var toObject = __webpack_require__("241e");
var call = __webpack_require__("b0dc");
var isArrayIter = __webpack_require__("3702");
var toLength = __webpack_require__("b447");
var createProperty = __webpack_require__("20fd");
var getIterFn = __webpack_require__("7cd6");

$export($export.S + $export.F * !__webpack_require__("4ee1")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "54a1":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6c1c");
__webpack_require__("1654");
module.exports = __webpack_require__("95d5");


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5559":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("dbdb")('keys');
var uid = __webpack_require__("62a0");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5b4e":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("36c3");
var toLength = __webpack_require__("b447");
var toAbsoluteIndex = __webpack_require__("0fc9");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "5b86":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return generateLegendBackground; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getDefaultColors; });
/* unused harmony export areEqual */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createSVGElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return setAttrs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeAttrs; });
/* unused harmony export defaultColors */
const setAttrs = (element, attributes) => {
    if (typeof attributes === 'object') {
        Object.keys(attributes).forEach((key) => {
            element.setAttribute(key, attributes[key]);
        });
    }
};

const removeAttrs = (element, ...attributes) => {
    attributes.forEach((attribute) => {
        element.removeAttribute(attribute);
    });
};

const createSVGElement = (element, container, attributes) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', element);

    if (typeof attributes === 'object') {
        setAttrs(el, attributes);
    }

    if (typeof container !== 'undefined') {
        container.appendChild(el);
    }

    return el;
};

const generateLegendBackground = (color, direction = 'horizontal') => {
    if (typeof color === 'string') {
        return `background-color: ${color}`;
    }

    if (color.length === 1) {
        return `background-color: ${color[0]}`;
    }

    return `background-image: linear-gradient(${direction === 'horizontal'
        ? 'to right, '
        : ''}${color.join(', ')})`;
};

const defaultColors = ['#FF4589', '#FF5050',
    '#05DF9D', '#4FF2FD',
    '#2D9CDB', '#A0BBFF',
    '#FFD76F', '#F2C94C',
    '#FF9A9A', '#FFB178'];

const getDefaultColors = (number) => {
    const colors = [...defaultColors];
    const colorSet = [];

    for (let i = 0; i < number; i++) {
        // get a random color
        const index = Math.abs(Math.round(Math.random() * (colors.length - 1)));
        // push it to the list
        colorSet.push(colors[index]);
        // and remove it, so that it is not chosen again
        colors.splice(index, 1);
    }
    return colorSet;
};

/*
    Used in comparing existing values to value provided on update
    It is limited to comparing arrays on purpose
    Name is slightly unusual, in order not to be confused with Lodash method
 */
const areEqual = (value, newValue) => {
    // If values are not of the same type
    const type = Object.prototype.toString.call(value);
    if (type !== Object.prototype.toString.call(newValue)) return false;
    if (type !== '[object Array]') return false;

    if (value.length !== newValue.length) return false;

    for (let i = 0; i < value.length; i++) {
        // if the it's a two dimensional array
        const currentType = Object.prototype.toString.call(value[i]);
        if (currentType !== Object.prototype.toString.call(newValue[i])) return false;
        if (currentType === '[object Array]') {
            // if row lengths are not equal then arrays are not equal
            if (value[i].length !== newValue[i].length) return false;
            // compare each element in the row
            for (let j = 0; j < value[i].length; j++) {
                if (value[i][j] !== newValue[i][j]) {
                    return false;
                }
            }
        } else if (value[i] !== newValue[i]) {
            // if it's a one dimensional array element
            return false;
        }
    }

    return true;
};




/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "62a0":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "6612":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/funnel-graph-js/src/js/number.js
var number = __webpack_require__("7294");

// CONCATENATED MODULE: ./node_modules/funnel-graph-js/src/js/path.js


const createCurves = (x1, y1, x2, y2) => ` C${Object(number["b" /* roundPoint */])((x2 + x1) / 2)},${y1} `
    + `${Object(number["b" /* roundPoint */])((x2 + x1) / 2)},${y2} ${x2},${y2}`;

const createVerticalCurves = (x1, y1, x2, y2) => ` C${x1},${Object(number["b" /* roundPoint */])((y2 + y1) / 2)} `
    + `${x2},${Object(number["b" /* roundPoint */])((y2 + y1) / 2)} ${x2},${y2}`;

/*
    A funnel segment is draw in a clockwise direction.
    Path 1-2 is drawn,
    then connected with a straight vertical line 2-3,
    then a line 3-4 is draw (using YNext points going in backwards direction)
    then path is closed (connected with the starting point 1).

    1---------->2
    ^           |
    |           v
    4<----------3

    On the graph on line 20 it works like this:
    A#0, A#1, A#2, A#3, B#3, B#2, B#1, B#0, close the path.

    Points for path "B" are passed as the YNext param.
 */

const createPath = (index, X, Y, YNext) => {
    let str = `M${X[0]},${Y[0]}`;

    for (let i = 0; i < X.length - 1; i++) {
        str += createCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
    }

    str += ` L${[...X].pop()},${[...YNext].pop()}`;

    for (let i = X.length - 1; i > 0; i--) {
        str += createCurves(X[i], YNext[i], X[i - 1], YNext[i - 1]);
    }

    str += ' Z';

    return str;
};

/*
    In a vertical path we go counter-clockwise

    1<----------4
    |           ^
    v           |
    2---------->3
 */

const createVerticalPath = (index, X, XNext, Y) => {
    let str = `M${X[0]},${Y[0]}`;

    for (let i = 0; i < X.length - 1; i++) {
        str += createVerticalCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
    }

    str += ` L${[...XNext].pop()},${[...Y].pop()}`;

    for (let i = X.length - 1; i > 0; i--) {
        str += createVerticalCurves(XNext[i], Y[i], XNext[i - 1], Y[i - 1]);
    }

    str += ' Z';

    return str;
};



// EXTERNAL MODULE: ./node_modules/funnel-graph-js/src/js/graph.js
var graph = __webpack_require__("5b86");

// CONCATENATED MODULE: ./node_modules/funnel-graph-js/src/js/main.js
/* eslint-disable no-trailing-spaces */




class main_FunnelGraph {
    constructor(options) {
        this.containerSelector = options.container;
        this.gradientDirection = (options.gradientDirection && options.gradientDirection === 'vertical')
            ? 'vertical'
            : 'horizontal';
        this.direction = (options.direction && options.direction === 'vertical') ? 'vertical' : 'horizontal';
        this.labels = main_FunnelGraph.getLabels(options);
        this.subLabels = main_FunnelGraph.getSubLabels(options);
        this.values = main_FunnelGraph.getValues(options);
        this.percentages = this.createPercentages();
        this.colors = options.data.colors || Object(graph["c" /* getDefaultColors */])(this.is2d() ? this.getSubDataSize() : 2);
        this.displayPercent = options.displayPercent || false;
        this.data = options.data;
        this.height = options.height;
        this.width = options.width;
    }

    /**
    An example of a two-dimensional funnel graph
    #0..................
                       ...#1................
                                           ......
    #0********************#1**                    #2.........................#3 (A)
                              *******************
                                                  #2*************************#3 (B)
                                                  #2+++++++++++++++++++++++++#3 (C)
                              +++++++++++++++++++
    #0++++++++++++++++++++#1++                    #2-------------------------#3 (D)
                                           ------
                       ---#1----------------
    #0-----------------

     Main axis is the primary axis of the graph.
     In a horizontal graph it's the X axis, and Y is the cross axis.
     However we use the names "main" and "cross" axis,
     because in a vertical graph the primary axis is the Y axis
     and the cross axis is the X axis.

     First step of drawing the funnel graph is getting the coordinates of points,
     that are used when drawing the paths.

     There are 4 paths in the example above: A, B, C and D.
     Such funnel has 3 labels and 3 subLabels.
     This means that the main axis has 4 points (number of labels + 1)
     One the ASCII illustrated graph above, those points are illustrated with a # symbol.

    */
    getMainAxisPoints() {
        const size = this.getDataSize();
        const points = [];
        const fullDimension = this.isVertical() ? this.getHeight() : this.getWidth();
        for (let i = 0; i <= size; i++) {
            points.push(Object(number["b" /* roundPoint */])(fullDimension * i / size));
        }
        return points;
    }

    getCrossAxisPoints() {
        const points = [];
        const fullDimension = this.getFullDimension();
        // get half of the graph container height or width, since funnel shape is symmetric
        // we use this when calculating the "A" shape
        const dimension = fullDimension / 2;
        if (this.is2d()) {
            const totalValues = this.getValues2d();
            const max = Math.max(...totalValues);

            // duplicate last value
            totalValues.push([...totalValues].pop());
            // get points for path "A"
            points.push(totalValues.map(value => Object(number["b" /* roundPoint */])((max - value) / max * dimension)));
            // percentages with duplicated last value
            const percentagesFull = this.getPercentages2d();
            const pointsOfFirstPath = points[0];

            for (let i = 1; i < this.getSubDataSize(); i++) {
                const p = points[i - 1];
                const newPoints = [];

                for (let j = 0; j < this.getDataSize(); j++) {
                    newPoints.push(Object(number["b" /* roundPoint */])(
                        // eslint-disable-next-line comma-dangle
                        p[j] + (fullDimension - pointsOfFirstPath[j] * 2) * (percentagesFull[j][i - 1] / 100)
                    ));
                }

                // duplicate the last value as points #2 and #3 have the same value on the cross axis
                newPoints.push([...newPoints].pop());
                points.push(newPoints);
            }

            // add points for path "D", that is simply the "inverted" path "A"
            points.push(pointsOfFirstPath.map(point => fullDimension - point));
        } else {
            // As you can see on the visualization above points #2 and #3 have the same cross axis coordinate
            // so we duplicate the last value
            const max = Math.max(...this.values);
            const values = [...this.values].concat([...this.values].pop());
            // if the graph is simple (not two-dimensional) then we have only paths "A" and "D"
            // which are symmetric. So we get the points for "A" and then get points for "D" by subtracting "A"
            // points from graph cross dimension length
            points.push(values.map(value => Object(number["b" /* roundPoint */])((max - value) / max * dimension)));
            points.push(points[0].map(point => fullDimension - point));
        }

        return points;
    }

    getGraphType() {
        return this.values && this.values[0] instanceof Array ? '2d' : 'normal';
    }

    is2d() {
        return this.getGraphType() === '2d';
    }

    isVertical() {
        return this.direction === 'vertical';
    }

    getDataSize() {
        return this.values.length;
    }

    getSubDataSize() {
        return this.values[0].length;
    }

    getFullDimension() {
        return this.isVertical() ? this.getWidth() : this.getHeight();
    }

    static getSubLabels(options) {
        if (!options.data) {
            throw new Error('Data is missing');
        }

        const { data } = options;

        if (typeof data.subLabels === 'undefined') return [];

        return data.subLabels;
    }

    static getLabels(options) {
        if (!options.data) {
            throw new Error('Data is missing');
        }

        const { data } = options;

        if (typeof data.labels === 'undefined') return [];

        return data.labels;
    }

    addLabels() {
        const holder = document.createElement('div');
        holder.setAttribute('class', 'svg-funnel-js__labels');

        this.percentages.forEach((percentage, index) => {
            const labelElement = document.createElement('div');
            labelElement.setAttribute('class', `svg-funnel-js__label label-${index + 1}`);

            const title = document.createElement('div');
            title.setAttribute('class', 'label__title');
            title.textContent = this.labels[index] || '';

            const value = document.createElement('div');
            value.setAttribute('class', 'label__value');

            const valueNumber = this.is2d() ? this.getValues2d()[index] : this.values[index];
            value.textContent = Object(number["a" /* formatNumber */])(valueNumber);

            const percentageValue = document.createElement('div');
            percentageValue.setAttribute('class', 'label__percentage');

            if (percentage !== 100) {
                percentageValue.textContent = `${percentage.toString()}%`;
            }

            labelElement.appendChild(value);
            labelElement.appendChild(title);
            if (this.displayPercent) {
                labelElement.appendChild(percentageValue);
            }

            if (this.is2d()) {
                const segmentPercentages = document.createElement('div');
                segmentPercentages.setAttribute('class', 'label__segment-percentages');
                let percenageList = '<ul class="segment-percentage__list">';

                const twoDimPercentages = this.getPercentages2d();

                this.subLabels.forEach((subLabel, j) => {
                    percenageList += `<li>${this.subLabels[j]}:
    <span class="percentage__list-label">${twoDimPercentages[index][j]}%</span>
 </li>`;
                });
                percenageList += '</ul>';
                segmentPercentages.innerHTML = percenageList;
                labelElement.appendChild(segmentPercentages);
            }

            holder.appendChild(labelElement);
        });

        this.container.appendChild(holder);
    }

    addSubLabels() {
        if (this.subLabels) {
            const subLabelsHolder = document.createElement('div');
            subLabelsHolder.setAttribute('class', 'svg-funnel-js__subLabels');

            let subLabelsHTML = '';

            this.subLabels.forEach((subLabel, index) => {
                subLabelsHTML += `<div class="svg-funnel-js__subLabel svg-funnel-js__subLabel-${index + 1}">
    <div class="svg-funnel-js__subLabel--color" 
        style="${Object(graph["b" /* generateLegendBackground */])(this.colors[index], this.gradientDirection)}"></div>
    <div class="svg-funnel-js__subLabel--title">${subLabel}</div>
</div>`;
            });

            subLabelsHolder.innerHTML = subLabelsHTML;
            this.container.appendChild(subLabelsHolder);
        }
    }

    createContainer() {
        if (!this.containerSelector) {
            throw new Error('Container is missing');
        }

        this.container = document.querySelector(this.containerSelector);
        this.container.classList.add('svg-funnel-js');

        this.graphContainer = document.createElement('div');
        this.graphContainer.classList.add('svg-funnel-js__container');
        this.container.appendChild(this.graphContainer);

        if (this.direction === 'vertical') {
            this.container.classList.add('svg-funnel-js--vertical');
        }
    }

    setValues(v) {
        this.values = v;
        return this;
    }

    setDirection(d) {
        this.direction = d;
        return this;
    }

    setHeight(h) {
        this.height = h;
        return this;
    }

    setWidth(w) {
        this.width = w;
        return this;
    }

    static getValues(options) {
        if (!options.data) {
            return [];
        }

        const { data } = options;

        if (typeof data === 'object') {
            return data.values;
        }

        return [];
    }

    getValues2d() {
        const values = [];

        this.values.forEach((valueSet) => {
            values.push(valueSet.reduce((sum, value) => sum + value, 0));
        });

        return values;
    }

    getPercentages2d() {
        const percentages = [];

        this.values.forEach((valueSet) => {
            const total = valueSet.reduce((sum, value) => sum + value, 0);
            percentages.push(valueSet.map(value => Object(number["b" /* roundPoint */])(value * 100 / total)));
        });

        return percentages;
    }

    createPercentages() {
        let values = [];

        if (this.is2d()) {
            values = this.getValues2d();
        } else {
            values = [...this.values];
        }

        const max = Math.max(...values);
        return values.map(value => Object(number["b" /* roundPoint */])(value * 100 / max));
    }

    applyGradient(svg, path, colors, index) {
        const defs = (svg.querySelector('defs') === null)
            ? Object(graph["a" /* createSVGElement */])('defs', svg)
            : svg.querySelector('defs');
        const gradientName = `funnelGradient-${index}`;
        const gradient = Object(graph["a" /* createSVGElement */])('linearGradient', defs, {
            id: gradientName
        });

        if (this.gradientDirection === 'vertical') {
            Object(graph["e" /* setAttrs */])(gradient, {
                x1: '0',
                x2: '0',
                y1: '0',
                y2: '1'
            });
        }

        const numberOfColors = colors.length;

        for (let i = 0; i < numberOfColors; i++) {
            Object(graph["a" /* createSVGElement */])('stop', gradient, {
                'stop-color': colors[i],
                offset: `${Math.round(100 * i / (numberOfColors - 1))}%`
            });
        }

        Object(graph["e" /* setAttrs */])(path, {
            fill: `url("#${gradientName}")`,
            stroke: `url("#${gradientName}")`
        });
    }

    makeSVG() {
        const svg = Object(graph["a" /* createSVGElement */])('svg', this.graphContainer, {
            width: this.getWidth(),
            height: this.getHeight()
        });

        const valuesNum = this.getCrossAxisPoints().length - 1;
        for (let i = 0; i < valuesNum; i++) {
            const path = Object(graph["a" /* createSVGElement */])('path', svg);

            const color = (this.is2d()) ? this.colors[i] : this.colors;
            const fillMode = (typeof color === 'string' || color.length === 1) ? 'solid' : 'gradient';

            if (fillMode === 'solid') {
                Object(graph["e" /* setAttrs */])(path, {
                    fill: color,
                    stroke: color
                });
            } else if (fillMode === 'gradient') {
                this.applyGradient(svg, path, color, i + 1);
            }

            svg.appendChild(path);
        }

        this.graphContainer.appendChild(svg);
    }

    getSVG() {
        const svg = this.container.querySelector('svg');

        if (!svg) {
            throw new Error('No SVG found inside of the container');
        }

        return svg;
    }

    getWidth() {
        return this.width || this.graphContainer.clientWidth;
    }

    getHeight() {
        return this.height || this.graphContainer.clientHeight;
    }

    getPathDefinitions() {
        const valuesNum = this.getCrossAxisPoints().length - 1;
        const paths = [];
        for (let i = 0; i < valuesNum; i++) {
            if (this.isVertical()) {
                const X = this.getCrossAxisPoints()[i];
                const XNext = this.getCrossAxisPoints()[i + 1];
                const Y = this.getMainAxisPoints();

                const d = createVerticalPath(i, X, XNext, Y);
                paths.push(d);
            } else {
                const X = this.getMainAxisPoints();
                const Y = this.getCrossAxisPoints()[i];
                const YNext = this.getCrossAxisPoints()[i + 1];

                const d = createPath(i, X, Y, YNext);
                paths.push(d);
            }
        }

        return paths;
    }

    drawPaths() {
        const svg = this.getSVG();
        const paths = svg.querySelectorAll('path');
        const definitions = this.getPathDefinitions();

        definitions.forEach((definition, index) => {
            paths[index].setAttribute('d', definition);
        });
    }

    draw() {
        this.createContainer();
        this.makeSVG();

        this.addLabels();

        if (this.is2d()) {
            this.addSubLabels();
        }

        this.drawPaths();
    }

    /*
        Methods
     */

    makeVertical() {
        if (this.direction === 'vertical') return true;

        this.direction = 'vertical';
        this.container.classList.add('svg-funnel-js--vertical');

        const svg = this.getSVG();
        const height = this.getHeight();
        const width = this.getWidth();
        Object(graph["e" /* setAttrs */])(svg, { height, width });

        this.drawPaths();

        return true;
    }

    makeHorizontal() {
        if (this.direction === 'horizontal') return true;

        this.direction = 'horizontal';
        this.container.classList.remove('svg-funnel-js--vertical');

        const svg = this.getSVG();
        const height = this.getHeight();
        const width = this.getWidth();
        Object(graph["e" /* setAttrs */])(svg, { height, width });

        this.drawPaths();

        return true;
    }

    toggleDirection() {
        if (this.direction === 'horizontal') {
            this.makeVertical();
        } else {
            this.makeHorizontal();
        }
    }

    gradientMakeVertical() {
        if (this.gradientDirection === 'vertical') return true;

        this.gradientDirection = 'vertical';
        const gradients = this.graphContainer.querySelectorAll('linearGradient');

        gradients.forEach((gradient) => {
            Object(graph["e" /* setAttrs */])(gradient, {
                x1: '0',
                x2: '0',
                y1: '0',
                y2: '1'
            });
        });

        return true;
    }

    gradientMakeHorizontal() {
        if (this.gradientDirection === 'horizontal') return true;

        this.gradientDirection = 'horizontal';
        const gradients = this.graphContainer.querySelectorAll('linearGradient');

        gradients.forEach((gradient) => {
            Object(graph["d" /* removeAttrs */])(gradient, 'x1', 'x2', 'y1', 'y2');
        });

        return true;
    }

    gradientToggleDirection() {
        if (this.gradientDirection === 'horizontal') {
            this.gradientMakeVertical();
        } else {
            this.gradientMakeHorizontal();
        }
    }

    updateWidth(w) {
        this.width = w;
        const svg = this.getSVG();
        const width = this.getWidth();
        Object(graph["e" /* setAttrs */])(svg, { width });

        this.drawPaths();

        return true;
    }

    updateHeight(h) {
        this.height = h;
        const svg = this.getSVG();
        const height = this.getHeight();
        Object(graph["e" /* setAttrs */])(svg, { height });

        this.drawPaths();

        return true;
    }

    // @TODO: refactor data update
    updateData(d) {
        if (typeof d.labels !== 'undefined') {
            this.container.querySelector('.svg-funnel-js__labels').remove();
            this.labels = main_FunnelGraph.getLabels({ data: d });
            this.addLabels();
        }
        if (typeof d.colors !== 'undefined') {
            this.colors = d.colors || Object(graph["c" /* getDefaultColors */])(this.is2d() ? this.getSubDataSize() : 2);
        }
        if (typeof d.values !== 'undefined') {
            if (Object.prototype.toString.call(d.values[0]) !== Object.prototype.toString.call(this.values[0])) {
                this.container.querySelector('svg').remove();
                this.values = main_FunnelGraph.getValues({ data: d });
                this.makeSVG();
                this.drawPaths();
            } else {
                this.values = main_FunnelGraph.getValues({ data: d });
                this.drawPaths();
            }
        }
        if (typeof d.subLabels !== 'undefined') {
            this.container.querySelector('.svg-funnel-js__subLabels').remove();
            this.subLabels = main_FunnelGraph.getSubLabels({ data: d });
            this.addSubLabels();
        }
    }

    update(o) {
        if (typeof o.displayPercent !== 'undefined') {
            if (this.displayPercent !== o.displayPercent) {
                if (this.displayPercent === true) {
                    this.container.querySelectorAll('.label__percentage').forEach((label) => {
                        label.remove();
                    });
                } else {
                    this.container.querySelectorAll('.svg-funnel-js__label').forEach((label, index) => {
                        const percentage = this.percentages[index];
                        const percentageValue = document.createElement('div');
                        percentageValue.setAttribute('class', 'label__percentage');

                        if (percentage !== 100) {
                            percentageValue.textContent = `${percentage.toString()}%`;
                            label.appendChild(percentageValue);
                        }
                    });
                }
            }
        }
        if (typeof o.height !== 'undefined') {
            this.updateHeight(o.height);
        }
        if (typeof o.width !== 'undefined') {
            this.updateWidth(o.width);
        }
        if (typeof o.gradientDirection !== 'undefined') {
            if (o.gradientDirection === 'vertical') {
                this.gradientMakeVertical();
            } else if (o.gradientDirection === 'horizontal') {
                this.gradientMakeHorizontal();
            }
        }
        if (typeof o.direction !== 'undefined') {
            if (o.direction === 'vertical') {
                this.makeVertical();
            } else if (o.direction === 'horizontal') {
                this.makeHorizontal();
            }
        }
        if (typeof o.data !== 'undefined') {
            this.updateData(o.data);
        }
    }
}

/* harmony default export */ var main = __webpack_exports__["default"] = (main_FunnelGraph);


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "682a":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */


var _Group = function () {
	this._tweens = {};
	this._tweensAddedDuringUpdate = {};
};

_Group.prototype = {
	getAll: function () {

		return Object.keys(this._tweens).map(function (tweenId) {
			return this._tweens[tweenId];
		}.bind(this));

	},

	removeAll: function () {

		this._tweens = {};

	},

	add: function (tween) {

		this._tweens[tween.getId()] = tween;
		this._tweensAddedDuringUpdate[tween.getId()] = tween;

	},

	remove: function (tween) {

		delete this._tweens[tween.getId()];
		delete this._tweensAddedDuringUpdate[tween.getId()];

	},

	update: function (time, preserve) {

		var tweenIds = Object.keys(this._tweens);

		if (tweenIds.length === 0) {
			return false;
		}

		time = time !== undefined ? time : TWEEN.now();

		// Tweens are updated in "batches". If you add a new tween during an update, then the
		// new tween will be updated in the next batch.
		// If you remove a tween during an update, it may or may not be updated. However,
		// if the removed tween was added during the current batch, then it will not be updated.
		while (tweenIds.length > 0) {
			this._tweensAddedDuringUpdate = {};

			for (var i = 0; i < tweenIds.length; i++) {

				var tween = this._tweens[tweenIds[i]];

				if (tween && tween.update(time) === false) {
					tween._isPlaying = false;

					if (!preserve) {
						delete this._tweens[tweenIds[i]];
					}
				}
			}

			tweenIds = Object.keys(this._tweensAddedDuringUpdate);
		}

		return true;

	}
};

var TWEEN = new _Group();

TWEEN.Group = _Group;
TWEEN._nextId = 0;
TWEEN.nextId = function () {
	return TWEEN._nextId++;
};


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (window) === 'undefined' && typeof (process) !== 'undefined' && process.hrtime) {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use window.performance.now if it is available.
else if (typeof (window) !== 'undefined' &&
         window.performance !== undefined &&
		 window.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = window.performance.now.bind(window.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object, group) {
	this._object = object;
	this._valuesStart = {};
	this._valuesEnd = {};
	this._valuesStartRepeat = {};
	this._duration = 1000;
	this._repeat = 0;
	this._repeatDelayTime = undefined;
	this._yoyo = false;
	this._isPlaying = false;
	this._reversed = false;
	this._delayTime = 0;
	this._startTime = null;
	this._easingFunction = TWEEN.Easing.Linear.None;
	this._interpolationFunction = TWEEN.Interpolation.Linear;
	this._chainedTweens = [];
	this._onStartCallback = null;
	this._onStartCallbackFired = false;
	this._onUpdateCallback = null;
	this._onCompleteCallback = null;
	this._onStopCallback = null;
	this._group = group || TWEEN;
	this._id = TWEEN.nextId();

};

TWEEN.Tween.prototype = {
	getId: function getId() {
		return this._id;
	},

	isPlaying: function isPlaying() {
		return this._isPlaying;
	},

	to: function to(properties, duration) {

		this._valuesEnd = properties;

		if (duration !== undefined) {
			this._duration = duration;
		}

		return this;

	},

	start: function start(time) {

		this._group.add(this);

		this._isPlaying = true;

		this._onStartCallbackFired = false;

		this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
		this._startTime += this._delayTime;

		for (var property in this._valuesEnd) {

			// Check if an Array was provided as property value
			if (this._valuesEnd[property] instanceof Array) {

				if (this._valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (this._object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			this._valuesStart[property] = this._object[property];

			if ((this._valuesStart[property] instanceof Array) === false) {
				this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			this._valuesStartRepeat[property] = this._valuesStart[property] || 0;

		}

		return this;

	},

	stop: function stop() {

		if (!this._isPlaying) {
			return this;
		}

		this._group.remove(this);
		this._isPlaying = false;

		if (this._onStopCallback !== null) {
			this._onStopCallback(this._object);
		}

		this.stopChainedTweens();
		return this;

	},

	end: function end() {

		this.update(this._startTime + this._duration);
		return this;

	},

	stopChainedTweens: function stopChainedTweens() {

		for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
			this._chainedTweens[i].stop();
		}

	},

	group: function group(group) {
		this._group = group;
		return this;
	},

	delay: function delay(amount) {

		this._delayTime = amount;
		return this;

	},

	repeat: function repeat(times) {

		this._repeat = times;
		return this;

	},

	repeatDelay: function repeatDelay(amount) {

		this._repeatDelayTime = amount;
		return this;

	},

	yoyo: function yoyo(yy) {

		this._yoyo = yy;
		return this;

	},

	easing: function easing(eas) {

		this._easingFunction = eas;
		return this;

	},

	interpolation: function interpolation(inter) {

		this._interpolationFunction = inter;
		return this;

	},

	chain: function chain() {

		this._chainedTweens = arguments;
		return this;

	},

	onStart: function onStart(callback) {

		this._onStartCallback = callback;
		return this;

	},

	onUpdate: function onUpdate(callback) {

		this._onUpdateCallback = callback;
		return this;

	},

	onComplete: function onComplete(callback) {

		this._onCompleteCallback = callback;
		return this;

	},

	onStop: function onStop(callback) {

		this._onStopCallback = callback;
		return this;

	},

	update: function update(time) {

		var property;
		var elapsed;
		var value;

		if (time < this._startTime) {
			return true;
		}

		if (this._onStartCallbackFired === false) {

			if (this._onStartCallback !== null) {
				this._onStartCallback(this._object);
			}

			this._onStartCallbackFired = true;
		}

		elapsed = (time - this._startTime) / this._duration;
		elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

		value = this._easingFunction(elapsed);

		for (property in this._valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (this._valuesStart[property] === undefined) {
				continue;
			}

			var start = this._valuesStart[property] || 0;
			var end = this._valuesEnd[property];

			if (end instanceof Array) {

				this._object[property] = this._interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					this._object[property] = start + (end - start) * value;
				}

			}

		}

		if (this._onUpdateCallback !== null) {
			this._onUpdateCallback(this._object);
		}

		if (elapsed === 1) {

			if (this._repeat > 0) {

				if (isFinite(this._repeat)) {
					this._repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in this._valuesStartRepeat) {

					if (typeof (this._valuesEnd[property]) === 'string') {
						this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
					}

					if (this._yoyo) {
						var tmp = this._valuesStartRepeat[property];

						this._valuesStartRepeat[property] = this._valuesEnd[property];
						this._valuesEnd[property] = tmp;
					}

					this._valuesStart[property] = this._valuesStartRepeat[property];

				}

				if (this._yoyo) {
					this._reversed = !this._reversed;
				}

				if (this._repeatDelayTime !== undefined) {
					this._startTime = time + this._repeatDelayTime;
				} else {
					this._startTime = time + this._delayTime;
				}

				return true;

			} else {

				if (this._onCompleteCallback !== null) {

					this._onCompleteCallback(this._object);
				}

				for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					this._chainedTweens[i].start(this._startTime + this._duration);
				}

				return false;

			}

		}

		return true;

	}
};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	if (true) {

		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return TWEEN;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	} else {}

})(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b4c":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6c1c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c367");
var global = __webpack_require__("e53d");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var TO_STRING_TAG = __webpack_require__("5168")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "71c1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var defined = __webpack_require__("25eb");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "7294":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return roundPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatNumber; });
const roundPoint = number => Math.round(number * 10) / 10;
const formatNumber = number => Number(number).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');




/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "774e":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d2d5");

/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7cd6":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "7e90":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var anObject = __webpack_require__("e4ae");
var getKeys = __webpack_require__("c3a1");

module.exports = __webpack_require__("8e60") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "8436":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8edb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("6612").default;


/***/ }),

/***/ "8f60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("a159");
var descriptor = __webpack_require__("aebd");
var setToStringTag = __webpack_require__("45f2");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("35e8")(IteratorPrototype, __webpack_require__("5168")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "9003":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("6b4c");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9138":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("35e8");


/***/ }),

/***/ "95d5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a159":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("e4ae");
var dPs = __webpack_require__("7e90");
var enumBugKeys = __webpack_require__("1691");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("1ec9")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("32fc").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "a5f5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunnelGraph_vue_vue_type_style_index_0_id_35606005_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ec4f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunnelGraph_vue_vue_type_style_index_0_id_35606005_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunnelGraph_vue_vue_type_style_index_0_id_35606005_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunnelGraph_vue_vue_type_style_index_0_id_35606005_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "a745":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("f410");

/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "b0dc":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("e4ae");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "b447":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("3a38");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "b8e3":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("8436");
var step = __webpack_require__("50ed");
var Iterators = __webpack_require__("481b");
var toIObject = __webpack_require__("36c3");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("30f1")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "c3a1":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("e6f3");
var enumBugKeys = __webpack_require__("1691");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("54a1");

/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cbb8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2d5":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1654");
__webpack_require__("549b");
module.exports = __webpack_require__("584a").Array.from;


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "dbdb":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b8e3") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "df7c":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "e6f3":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("07e3");
var toIObject = __webpack_require__("36c3");
var arrayIndexOf = __webpack_require__("5b4e")(false);
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "ec4f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f410":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1af6");
module.exports = __webpack_require__("584a").Array.isArray;


/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b5c12f96-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FunnelGraph.vue?vue&type=template&id=35606005&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"funnel svg-funnel-js",class:{'svg-funnel-js--vertical': _vm.direction === 'vertical'}},[_c('div',{staticClass:"svg-funnel-js__container"},[_c('svg',{attrs:{"width":_vm.width,"height":_vm.height}},[_c('defs',_vm._l((_vm.gradientSet),function(colors,index){return _c('linearGradient',{key:index,attrs:{"id":("funnelGradient-" + ((index+1))),"gradientTransform":_vm.gradientAngle}},_vm._l((colors.values),function(color,index){return _c('stop',{key:index,attrs:{"stop-color":color,"offset":_vm.offsetColor(index, colors.values.length)}})}),1)}),1),_vm._l((_vm.paths),function(path,index){return _c('path',{key:index,attrs:{"fill":_vm.colorSet[index].fill,"stroke":_vm.colorSet[index].fill,"d":path}})})],2)]),_c('transition-group',{staticClass:"svg-funnel-js__labels",attrs:{"name":"appear","tag":"div"},on:{"enter":_vm.enterTransition,"leave":_vm.leaveTransition}},_vm._l((_vm.valuesFormatted),function(value,index){return _c('div',{key:index,staticClass:"svg-funnel-js__label",class:("label-" + ((index+1)))},[_c('div',{staticClass:"label__value"},[_vm._v(_vm._s(value))]),(_vm.labels)?_c('div',{staticClass:"label__title"},[_vm._v(_vm._s(_vm.labels[index]))]):_vm._e(),(_vm.displayPercentage && _vm.percentages()[index] !== 100)?_c('div',{staticClass:"label__percentage"},[_vm._v("\n          "+_vm._s(_vm.percentages()[index])+"%\n        ")]):_vm._e(),(_vm.is2d())?_c('div',{staticClass:"label__segment-percentages"},[_c('ul',{staticClass:"segment-percentage__list"},_vm._l((_vm.subLabels),function(subLabel,j){return _c('li',{key:j},[_vm._v("\n              "+_vm._s(subLabel)+":\n              "),_c('span',{staticClass:"percentage__list-label"},[_vm._v(_vm._s(_vm.twoDimPercentages()[index][j])+"%")])])}),0)]):_vm._e()])}),0)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FunnelGraph.vue?vue&type=template&id=35606005&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("a745");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (is_array_default()(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/from.js
var from = __webpack_require__("774e");
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js
var is_iterable = __webpack_require__("c8bb");
var is_iterable_default = /*#__PURE__*/__webpack_require__.n(is_iterable);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js


function _iterableToArray(iter) {
  if (is_iterable_default()(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return from_default()(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/constants.js
const _ = undefined;
const V = 'V', H = 'H', L = 'L', Z = 'Z', M = 'M', C = 'C', S = 'S', Q = 'Q', T = 'T', A = 'A';
const EMPTY = ' ';
const FILL = 'fill';
const NONE = 'none';

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/utilities/inspect.js
function isString(obj) {
    return typeof obj === 'string';
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/renderPath.js


function renderPath(ns, formatter) {
    if (isString(ns)) {
        return ns;
    }
    let result = [];
    for (let i = 0; i < ns.length; i++) {
        const n = ns[i];
        result.push(M, formatter(n[0]), formatter(n[1]), C);
        let lastResult;
        for (let f = 2; f < n.length; f += 6) {
            const p0 = formatter(n[f]);
            const p1 = formatter(n[f + 1]);
            const p2 = formatter(n[f + 2]);
            const p3 = formatter(n[f + 3]);
            const dx = formatter(n[f + 4]);
            const dy = formatter(n[f + 5]);
            const isPoint = p0 == dx && p2 == dx && p1 == dy && p3 == dy;
            if (!isPoint || lastResult != (lastResult = ('' + p0 + p1 + p2 + p3 + dx + dy))) {
                result.push(p0, p1, p2, p3, dx, dy);
            }
        }
    }
    return result.join(EMPTY);
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/utilities/math.js
const math = Math;
const abs = math.abs;
const min = math.min;
const max = math.max;
const floor = math.floor;
const round = math.round;
const sqrt = math.sqrt;
const pow = math.pow;
const cos = math.cos;
const asin = math.asin;
const sin = math.sin;
const tan = math.tan;
const PI = math.PI;
const quadraticRatio = 2.0 / 3;
const EPSILON = pow(2, -52);

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/utilities/errors.js

function raiseError() {
    throw new Error(Array.prototype.join.call(arguments, EMPTY));
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/utilities/objects.js
function fillObject(dest, src) {
    for (let key in src) {
        if (!dest.hasOwnProperty(key)) {
            dest[key] = src[key];
        }
    }
    return dest;
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/utilities/browser.js
var userAgent = typeof window !== 'undefined' && window.navigator.userAgent;
const isEdge = /(MSIE |Trident\/|Edge\/)/i.test(userAgent);

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/utilities/createNumberArray.js

const arrayConstructor = isEdge ? Array : Float32Array;
function createNumberArray(n) {
    return new arrayConstructor(n);
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/fillSegments.js


function fillSegments(larger, smaller, origin) {
    const largeLen = larger.length;
    const smallLen = smaller.length;
    if (largeLen < smallLen) {
        return fillSegments(smaller, larger, origin);
    }
    smaller.length = largeLen;
    for (let i = smallLen; i < largeLen; i++) {
        const l = larger[i];
        const d = createNumberArray(l.d.length);
        for (let k = 0; k < l.d.length; k += 2) {
            d[k] = origin.absolute ? origin.x : l.x + (l.w * origin.x);
            d[k + 1] = origin.absolute ? origin.y : l.y + (l.y * origin.y);
        }
        smaller[i] = fillObject({ d }, l);
    }
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/rotatePoints.js

function rotatePoints(ns, count) {
    const len = ns.length;
    const rightLen = len - count;
    const buffer = createNumberArray(count);
    let i;
    for (i = 0; i < count; i++) {
        buffer[i] = ns[i];
    }
    for (i = count; i < len; i++) {
        ns[i - count] = ns[i];
    }
    for (i = 0; i < count; i++) {
        ns[rightLen + i] = buffer[i];
    }
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/utilities/distance.js

function distance(x1, y1, x2, y2) {
    return sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/normalizePoints.js



function normalizePoints(x, y, ns) {
    let len = ns.length;
    if (ns[len - 2] !== ns[0] || ns[len - 1] !== ns[1]) {
        return;
    }
    const buffer = ns.slice(2);
    len = buffer.length;
    let index, minAmount;
    for (let i = 0; i < len; i += 6) {
        const next = distance(x, y, buffer[i], buffer[i + 1]);
        if (minAmount === _ || next < minAmount) {
            minAmount = next;
            index = i;
        }
    }
    rotatePoints(buffer, index);
    ns[0] = buffer[len - 2];
    ns[1] = buffer[len - 1];
    for (let i = 0; i < buffer.length; i++) {
        ns[i + 2] = buffer[i];
    }
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/fillPoints.js


function fillPoints(matrix, addPoints) {
    const ilen = matrix[0].length;
    for (let i = 0; i < ilen; i++) {
        const left = matrix[0][i];
        const right = matrix[1][i];
        const totalLength = max(left.length + addPoints, right.length + addPoints);
        matrix[0][i] = fillSubpath(left, totalLength);
        matrix[1][i] = fillSubpath(right, totalLength);
    }
}
function fillSubpath(ns, totalLength) {
    let totalNeeded = totalLength - ns.length;
    const ratio = Math.ceil(totalNeeded / ns.length);
    const result = createNumberArray(totalLength);
    result[0] = ns[0];
    result[1] = ns[1];
    let k = 1, j = 1;
    while (j < totalLength - 1) {
        result[++j] = ns[++k];
        result[++j] = ns[++k];
        result[++j] = ns[++k];
        result[++j] = ns[++k];
        const dx = result[++j] = ns[++k];
        const dy = result[++j] = ns[++k];
        if (totalNeeded) {
            for (let f = 0; f < ratio && totalNeeded; f++) {
                result[j + 5] = result[j + 3] = result[j + 1] = dx;
                result[j + 6] = result[j + 4] = result[j + 2] = dy;
                j += 6;
                totalNeeded -= 6;
            }
        }
    }
    return result;
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/normalizePaths.js





function sizeDesc(a, b) {
    return b.p - a.p;
}
function normalizePaths(left, right, options) {
    const leftPath = getSortedSegments(left);
    const rightPath = getSortedSegments(right);
    const origin = options.origin;
    const ox = origin.x;
    const oy = origin.y;
    const absolute = origin.absolute;
    if (leftPath.length !== rightPath.length) {
        if (options.optimize === FILL) {
            fillSegments(leftPath, rightPath, options.origin);
        }
        else {
            raiseError('optimize:none requires equal lengths');
        }
    }
    const matrix = Array(2);
    matrix[0] = leftPath.map(toPoints);
    matrix[1] = rightPath.map(toPoints);
    if (options.optimize !== NONE) {
        for (let i = 0; i < leftPath.length; i++) {
            const ls = leftPath[i];
            const rs = rightPath[i];
            normalizePoints(absolute ? ox : ls.x + ls.w * ox, absolute ? oy : ls.y + ls.h * oy, matrix[0][i]);
            normalizePoints(absolute ? ox : rs.x + rs.w * ox, absolute ? oy : rs.y + rs.h * oy, matrix[1][i]);
        }
    }
    if (options.optimize === FILL) {
        fillPoints(matrix, options.addPoints * 6);
    }
    return matrix;
}
function getSortedSegments(path) {
    return path.data.slice().sort(sizeDesc);
}
function toPoints(p) {
    return p.d;
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/interpolatePath.js







const defaultOptions = {
    addPoints: 0,
    optimize: FILL,
    origin: { x: 0, y: 0 },
    precision: 0
};
function interpolatePath(paths, options) {
    options = fillObject(options, defaultOptions);
    if (!paths || paths.length < 2) {
        raiseError('invalid arguments');
    }
    const hlen = paths.length - 1;
    const items = Array(hlen);
    for (let h = 0; h < hlen; h++) {
        items[h] = getPathInterpolator(paths[h], paths[h + 1], options);
    }
    const formatter = !options.precision ? round : (n) => n.toFixed(options.precision);
    return (offset) => {
        const d = hlen * offset;
        const flr = min(floor(d), hlen - 1);
        return renderPath(items[flr]((d - flr) / (flr + 1)), formatter);
    };
}
function getPathInterpolator(left, right, options) {
    const matrix = normalizePaths(left, right, options);
    const n = matrix[0].length;
    return (offset) => {
        if (abs(offset - 0) < EPSILON) {
            return left.path;
        }
        if (abs(offset - 1) < EPSILON) {
            return right.path;
        }
        const results = Array(n);
        for (let h = 0; h < n; h++) {
            results[h] = mixPoints(matrix[0][h], matrix[1][h], offset);
        }
        return results;
    };
}
function mixPoints(a, b, o) {
    const alen = a.length;
    const results = createNumberArray(alen);
    for (let i = 0; i < alen; i++) {
        results[i] = a[i] + (b[i] - a[i]) * o;
    }
    return results;
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/utilities/coalesce.js

function coalesce(current, fallback) {
    return current === _ ? fallback : current;
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/arcToCurve.js

const _120 = PI * 120 / 180;
const PI2 = PI * 2;
function arcToCurve(x1, y1, rx, ry, angle, large, sweep, dx, dy, f1, f2, cx, cy) {
    if (rx <= 0 || ry <= 0) {
        return [x1, y1, dx, dy, dx, dy];
    }
    const rad = PI / 180 * (+angle || 0);
    const cosrad = cos(rad);
    const sinrad = sin(rad);
    const recursive = !!f1;
    if (!recursive) {
        const x1old = x1;
        const dxold = dx;
        x1 = x1old * cosrad - y1 * -sinrad;
        y1 = x1old * -sinrad + y1 * cosrad;
        dx = dxold * cosrad - dy * -sinrad;
        dy = dxold * -sinrad + dy * cosrad;
        const x = (x1 - dx) / 2;
        const y = (y1 - dy) / 2;
        let h = x * x / (rx * rx) + y * y / (ry * ry);
        if (h > 1) {
            h = sqrt(h);
            rx = h * rx;
            ry = h * ry;
        }
        const k = (large === sweep ? -1 : 1) *
            sqrt(abs((rx * rx * ry * ry - rx * rx * y * y - ry * ry * x * x) / (rx * rx * y * y + ry * ry * x * x)));
        cx = k * rx * y / ry + (x1 + dx) / 2;
        cy = k * -ry * x / rx + (y1 + dy) / 2;
        f1 = asin((y1 - cy) / ry);
        f2 = asin((dy - cy) / ry);
        if (x1 < cx) {
            f1 = PI - f1;
        }
        if (dx < cx) {
            f2 = PI - f2;
        }
        if (f1 < 0) {
            f1 += PI2;
        }
        if (f2 < 0) {
            f2 += PI2;
        }
        if (sweep && f1 > f2) {
            f1 -= PI2;
        }
        if (!sweep && f2 > f1) {
            f2 -= PI2;
        }
    }
    let res;
    if (abs(f2 - f1) > _120) {
        const f2old = f2;
        const x2old = dx;
        const y2old = dy;
        f2 = f1 + _120 * (sweep && f2 > f1 ? 1 : -1);
        dx = cx + rx * cos(f2);
        dy = cy + ry * sin(f2);
        res = arcToCurve(dx, dy, rx, ry, angle, 0, sweep, x2old, y2old, f2, f2old, cx, cy);
    }
    else {
        res = [];
    }
    const t = 4 / 3 * tan((f2 - f1) / 4);
    res.splice(0, 0, 2 * x1 - (x1 + t * rx * sin(f1)), 2 * y1 - (y1 - t * ry * cos(f1)), dx + t * rx * sin(f2), dy - t * ry * cos(f2), dx, dy);
    if (!recursive) {
        for (let i = 0, ilen = res.length; i < ilen; i += 2) {
            const xt = res[i], yt = res[i + 1];
            res[i] = xt * cosrad - yt * sinrad;
            res[i + 1] = xt * sinrad + yt * cosrad;
        }
    }
    return res;
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/parsePoints.js





const argLengths = { M: 2, H: 1, V: 1, L: 2, Z: 0, C: 6, S: 4, Q: 4, T: 2, A: 7 };
function addCurve(ctx, x1, y1, x2, y2, dx, dy) {
    const x = ctx.x;
    const y = ctx.y;
    ctx.x = coalesce(dx, x);
    ctx.y = coalesce(dy, y);
    ctx.p.push(coalesce(x1, x), (y1 = coalesce(y1, y)), (x2 = coalesce(x2, x)), (y2 = coalesce(y2, y)), ctx.x, ctx.y);
    ctx.lc = ctx.c;
}
function convertToAbsolute(ctx) {
    const c = ctx.c;
    const t = ctx.t;
    const x = ctx.x;
    const y = ctx.y;
    if (c === V) {
        t[0] += y;
    }
    else if (c === H) {
        t[0] += x;
    }
    else if (c === A) {
        t[5] += x;
        t[6] += y;
    }
    else {
        for (let j = 0; j < t.length; j += 2) {
            t[j] += x;
            t[j + 1] += y;
        }
    }
}
function parseSegments(d) {
    return d
        .replace(/[\^\s]*([mhvlzcsqta]|\-?\d*\.?\d+)[,\$\s]*/gi, ' $1')
        .replace(/([mhvlzcsqta])/gi, ' $1')
        .trim()
        .split('  ')
        .map(parseSegment);
}
function parseSegment(s2) {
    return s2.split(EMPTY).map(parseCommand);
}
function parseCommand(str, i) {
    return i === 0 ? str : +str;
}
function parsePoints(d) {
    const ctx = {
        x: 0,
        y: 0,
        s: []
    };
    const segments = parseSegments(d);
    for (let i = 0; i < segments.length; i++) {
        const terms = segments[i];
        const commandLetter = terms[0];
        const command = commandLetter.toUpperCase();
        const isRelative = command !== Z && command !== commandLetter;
        ctx.c = command;
        const maxLength = argLengths[command];
        const t2 = terms;
        let k = 1;
        do {
            ctx.t = t2.length === 1 ? t2 : t2.slice(k, k + maxLength);
            if (isRelative) {
                convertToAbsolute(ctx);
            }
            const n = ctx.t;
            const x = ctx.x;
            const y = ctx.y;
            let x1, y1, dx, dy, x2, y2;
            if (command === M) {
                ctx.s.push((ctx.p = [(ctx.x = n[0]), (ctx.y = n[1])]));
            }
            else if (command === H) {
                addCurve(ctx, _, _, _, _, n[0], _);
            }
            else if (command === V) {
                addCurve(ctx, _, _, _, _, _, n[0]);
            }
            else if (command === L) {
                addCurve(ctx, _, _, _, _, n[0], n[1]);
            }
            else if (command === Z) {
                addCurve(ctx, _, _, _, _, ctx.p[0], ctx.p[1]);
            }
            else if (command === C) {
                addCurve(ctx, n[0], n[1], n[2], n[3], n[4], n[5]);
                ctx.cx = n[2];
                ctx.cy = n[3];
            }
            else if (command === S) {
                const isInitialCurve = ctx.lc !== S && ctx.lc !== C;
                x1 = isInitialCurve ? _ : x * 2 - ctx.cx;
                y1 = isInitialCurve ? _ : y * 2 - ctx.cy;
                addCurve(ctx, x1, y1, n[0], n[1], n[2], n[3]);
                ctx.cx = n[0];
                ctx.cy = n[1];
            }
            else if (command === Q) {
                const cx1 = n[0];
                const cy1 = n[1];
                dx = n[2];
                dy = n[3];
                addCurve(ctx, x + (cx1 - x) * quadraticRatio, y + (cy1 - y) * quadraticRatio, dx + (cx1 - dx) * quadraticRatio, dy + (cy1 - dy) * quadraticRatio, dx, dy);
                ctx.cx = cx1;
                ctx.cy = cy1;
            }
            else if (command === T) {
                dx = n[0];
                dy = n[1];
                if (ctx.lc === Q || ctx.lc === T) {
                    x1 = x + (x * 2 - ctx.cx - x) * quadraticRatio;
                    y1 = y + (y * 2 - ctx.cy - y) * quadraticRatio;
                    x2 = dx + (x * 2 - ctx.cx - dx) * quadraticRatio;
                    y2 = dy + (y * 2 - ctx.cy - dy) * quadraticRatio;
                }
                else {
                    x1 = x2 = x;
                    y1 = y2 = y;
                }
                addCurve(ctx, x1, y1, x2, y2, dx, dy);
                ctx.cx = x2;
                ctx.cy = y2;
            }
            else if (command === A) {
                const beziers = arcToCurve(x, y, n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
                for (let j = 0; j < beziers.length; j += 6) {
                    addCurve(ctx, beziers[j], beziers[j + 1], beziers[j + 2], beziers[j + 3], beziers[j + 4], beziers[j + 5]);
                }
            }
            else {
                raiseError(ctx.c, ' is not supported');
            }
            k += maxLength;
        } while (k < t2.length);
    }
    return ctx.s;
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/perimeterPoints.js


function perimeterPoints(pts) {
    const n = pts.length;
    let x2 = pts[n - 2];
    let y2 = pts[n - 1];
    let p = 0;
    for (let i = 0; i < n; i += 6) {
        p += distance(pts[i], pts[i + 1], x2, y2);
        x2 = pts[i];
        y2 = pts[i + 1];
    }
    return floor(p);
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/operators/parsePath.js



function createPathSegmentArray(points) {
    let xmin = points[0];
    let ymin = points[1];
    let ymax = ymin;
    let xmax = xmin;
    for (let i = 2; i < points.length; i += 6) {
        let x = points[i + 4];
        let y = points[i + 5];
        xmin = min(xmin, x);
        xmax = max(xmax, x);
        ymin = min(ymin, y);
        ymax = max(ymax, y);
    }
    return {
        d: points,
        x: xmin,
        y: ymin,
        w: xmax - xmin,
        h: ymax - ymin,
        p: perimeterPoints(points)
    };
}
function parsePath(d) {
    return {
        path: d,
        data: parsePoints(d).map(createPathSegmentArray)
    };
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/getPath.js

const selectorRegex = /^([#|\.]|path)/i;
function getPath(selector) {
    if (isString(selector)) {
        if (!selectorRegex.test(selector)) {
            return selector;
        }
        selector = document.querySelector(selector);
    }
    return selector.getAttribute('d');
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/parse.js


function parse(d) {
    return parsePath(getPath(d));
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/interpolate.js


function interpolate(paths, options) {
    return interpolatePath(paths.map(parse), options || {});
}

// CONCATENATED MODULE: ./node_modules/polymorph-js/lib.es2015/index.js


// EXTERNAL MODULE: ./node_modules/@tweenjs/tween.js/src/Tween.js
var Tween = __webpack_require__("682a");
var Tween_default = /*#__PURE__*/__webpack_require__.n(Tween);

// EXTERNAL MODULE: ./node_modules/funnel-graph-js/index.js
var funnel_graph_js = __webpack_require__("8edb");
var funnel_graph_js_default = /*#__PURE__*/__webpack_require__.n(funnel_graph_js);

// EXTERNAL MODULE: ./node_modules/funnel-graph-js/src/js/number.js
var number = __webpack_require__("7294");

// EXTERNAL MODULE: ./node_modules/funnel-graph-js/src/js/graph.js
var graph = __webpack_require__("5b86");

// EXTERNAL MODULE: ./node_modules/funnel-graph-js/src/scss/main.scss
var main = __webpack_require__("cbb8");

// EXTERNAL MODULE: ./node_modules/funnel-graph-js/src/scss/theme.scss
var theme = __webpack_require__("0787");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FunnelGraph.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var FunnelGraphvue_type_script_lang_js_ = ({
  name: 'FunnelGraph',
  props: {
    animated: {
      type: Boolean,
      default: false
    },
    width: [String, Number],
    height: [String, Number],
    values: Array,
    labels: Array,
    colors: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    subLabels: Array,
    direction: {
      type: String,
      default: 'horizontal'
    },
    gradientDirection: {
      type: String,
      default: 'horizontal'
    },
    displayPercentage: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      paths: [],
      prevPaths: [],
      // paths before update, used for animations
      graph: null,
      animationRunning: false,
      defaultColors: Object(graph["c" /* getDefaultColors */])(10)
    };
  },
  computed: {
    valuesFormatted: function valuesFormatted() {
      if (this.graph.is2d()) {
        return this.graph.getValues2d().map(function (value) {
          return Object(number["a" /* formatNumber */])(value);
        });
      }

      return this.values.map(function (value) {
        return Object(number["a" /* formatNumber */])(value);
      });
    },
    colorSet: function colorSet() {
      var colorSet = [];
      var gradientCount = 0;

      for (var i = 0; i < this.paths.length; i++) {
        var values = this.graph.is2d() ? this.getColors[i] : this.getColors;
        var fillMode = typeof values === 'string' || values.length === 1 ? 'solid' : 'gradient';
        if (fillMode === 'gradient') gradientCount += 1;
        colorSet.push({
          values: values,
          fillMode: fillMode,
          fill: fillMode === 'solid' ? values : "url('#funnelGradient-".concat(gradientCount, "')")
        });
      }

      return colorSet;
    },
    gradientSet: function gradientSet() {
      var gradientSet = [];
      this.colorSet.forEach(function (colors) {
        if (colors.fillMode === 'gradient') {
          gradientSet.push(colors);
        }
      });
      return gradientSet;
    },
    getColors: function getColors() {
      if (this.colors instanceof Array && this.colors.length === 0) {
        return Object(graph["c" /* getDefaultColors */])(this.is2d() ? this.values[0].length : 2);
      }

      if (this.colors.length < this.paths.length) {
        return _toConsumableArray(this.colors).concat(_toConsumableArray(this.defaultColors).splice(this.paths.length, this.paths.length - this.colors.length));
      }

      return this.colors;
    },
    gradientAngle: function gradientAngle() {
      return "rotate(".concat(this.gradientDirection === 'vertical' ? 90 : 0, ")");
    }
  },
  methods: {
    enterTransition: function enterTransition(el, done) {
      if (!this.animated) done();
    },
    leaveTransition: function leaveTransition(el, done) {
      if (!this.animated) done();
    },
    is2d: function is2d() {
      return this.graph.is2d();
    },
    percentages: function percentages() {
      return this.graph.createPercentages();
    },
    twoDimPercentages: function twoDimPercentages() {
      if (!this.is2d()) {
        return [];
      }

      return this.graph.getPercentages2d();
    },
    offsetColor: function offsetColor(index, length) {
      return "".concat(Math.round(100 * index / (length - 1)), "%");
    },
    makeAnimations: function makeAnimations() {
      var _this = this;

      var interpolators = [];
      var dimensionChanged = this.prevPaths.length !== this.paths.length;
      var origin = {
        x: 0.5,
        y: 0.5
      };

      if (dimensionChanged) {
        origin = {
          x: 0,
          y: 0.5
        };

        if (this.graph.isVertical()) {
          origin = {
            x: 1,
            y: 1
          };
        }

        if (!this.graph.is2d()) {
          origin = {
            x: 0,
            y: 1
          };
        }
      }

      this.paths.forEach(function (path, index) {
        var oldPath = _this.prevPaths[index] || _this.graph.getPathMedian(index);

        if (dimensionChanged) oldPath = _this.graph.getPathMedian(index);
        var interpolator = interpolate([oldPath, path], {
          addPoints: 1,
          origin: origin,
          optimize: 'fill',
          precision: 1
        });
        interpolators.push(interpolator);
      });

      function animate() {
        if (Tween_default.a.update()) {
          requestAnimationFrame(animate);
        }
      }

      var position = {
        value: 0
      };
      var tween = new Tween_default.a.Tween(position).to({
        value: 1
      }, 700).easing(Tween_default.a.Easing.Cubic.InOut).onStart(function () {
        _this.animationRunning = true;
      }).onUpdate(function () {
        for (var index = 0; index < _this.paths.length; index++) {
          _this.paths[index] = interpolators[index](position.value); // eslint-disable-next-line no-underscore-dangle

          _this.paths.__ob__.dep.notify();
        }
      }).onComplete(function () {
        _this.animationRunning = false;
      });
      if (this.animationRunning === false) tween.start();
      animate();
    },
    drawPaths: function drawPaths() {
      var _this2 = this;

      this.prevPaths = this.paths;
      this.paths = [];
      var definitions = this.graph.getPathDefinitions();
      definitions.forEach(function (d) {
        _this2.paths.push(d);
      });
    }
  },
  beforeMount: function beforeMount() {
    this.graph = new funnel_graph_js_default.a({
      height: this.height,
      width: this.width,
      data: {
        labels: this.labels,
        values: this.values
      }
    });
    this.drawPaths();
    if (this.animated) this.makeAnimations();
  },
  watch: {
    values: function values() {
      this.graph.setValues(this.values);
      this.drawPaths();
      if (this.animated) this.makeAnimations();
    },
    direction: function direction() {
      this.graph.setDirection(this.direction).setWidth(this.width).setHeight(this.height);
      this.drawPaths();
    }
  }
});
// CONCATENATED MODULE: ./src/components/FunnelGraph.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FunnelGraphvue_type_script_lang_js_ = (FunnelGraphvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/FunnelGraph.vue?vue&type=style&index=0&id=35606005&scoped=true&lang=css&
var FunnelGraphvue_type_style_index_0_id_35606005_scoped_true_lang_css_ = __webpack_require__("a5f5");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/FunnelGraph.vue






/* normalize component */

var component = normalizeComponent(
  components_FunnelGraphvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "35606005",
  null
  
)

/* harmony default export */ var FunnelGraph = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (FunnelGraph);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=FunnelGraph.umd.js.map