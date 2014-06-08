/**
 *  poor men's module - but is considered to be sufficient enough in oder to solve the task.
 */
(function (appRoot, global/*, $*/) {


  var
    module,


    toString = global.String,
    toNumber = global.Number,


  //createCopy = function (blueprint) {                       // see messages of next comment block below.
  //
  //  var GreenBody = function () {};
  //  GreenBody.prototype = blueprint;
  //  return (new GreenBody);
  //},


    mapMatchData = function (obj) {
      return {

        avatarSrc : toString(obj.picture),
        accountId : toString(obj.tHand),
        realName  : toString(obj.name),

        traitDataList : [{
          name  : "Consciousness",
          value : toNumber(obj.traits.consc)
        }, {
          name  : "Openness",
          value : toNumber(obj.traits.openn)
        }, {
          name  : "Neurotic",
          value : toNumber(obj.traits.neuro)
        }, {
          name  : "Agreeability",
          value : toNumber(obj.traits.agree)
        }, {
          name  : "Extraversion",
          value : toNumber(obj.traits.extra)
        }]
      };
    },
    reduceMatchDataList = function (list) {
      return list.reduce(function (collector, obj) {

        collector.push(mapMatchData(obj))
        return collector;

      }, []);
    }
  ;


  module = {

  //copyModel   : createCopy, // need to figure out why this didn't really work out - prototypal copy on write clones are faster.
    copyModel   : reduceMatchDataList,
    createModel : reduceMatchDataList
  };


  return (appRoot.model.CategoryMatches = module);


}(tf, window/*, jQuery*/));
