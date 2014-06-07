/**
 *  see also / derived from:
 *  [https://github.com/petsel/composable/blob/master/src/entities/RegExp/RegExp.escape-toSearch.js]
 *  [https://github.com/petsel/javascript-api-extensions/blob/master/core/RegExp/RegExp.patch.js]
 */
(function () {


  var
    global  = this,

    RegExp  = global.RegExp,
    regX    = (/(?:)/)
  ;


  RegExp.escape = (function (regX, CLASS_PATTERN_REGEXP_CHARS, escape) {
    return function (str) {

      return ("" + str).replace(regX.compile(CLASS_PATTERN_REGEXP_CHARS, "g"), escape);
    };
  }(
    regX,
    "([$^*+?!:=.|(){}[\\]\\\\])",
    function () {return ("\\" + arguments[1]);}
  ));


  RegExp.toSearch = (function (regX, CLASS_PATTERN_WS_SEQUENCE, regexp_escape) {
    return function (str) {

      return regexp_escape("" + str).replace(regX.compile(CLASS_PATTERN_WS_SEQUENCE, "g"), CLASS_PATTERN_WS_SEQUENCE);
    };
  }(
      regX, ["[",

        "\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000",
        "\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008",
        "\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF",

      "]+"].join(""),
      RegExp.escape
    ));


}).call(null);
