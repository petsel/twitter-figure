/**
 *  see also / derived from:
 *  [https://github.com/petsel/composable/blob/master/src/entities/RegExp/RegExp.escape-toSearch.js]
 *  [https://github.com/petsel/javascript-api-extensions/blob/master/core/RegExp/RegExp.patch.js]
 */
(function () {

  var
    global = this,

    regexpPrototype = global.RegExp.prototype,
    regexp_compile  = regexpPrototype.compile,

    regX = (/(?:)/)
  ;

  /**
   *  fix some browsers (e.g. webkit) "broken" prototypal [RegExp.compile] method.
   */
  if (("" + regX.compile("(?:)", "")) !== ("" + regX)) {
    regexpPrototype.compile = function (/*search, flags*/) {

      regexp_compile.apply(this, arguments);
      return this;
    };
  }

  regX = null;
  delete regX;

}).call(null);
