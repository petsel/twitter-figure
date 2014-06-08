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


    noop = function () {},


    categoryFilterMap = {

      "creative-minds": function (matchData) {
        return (
              (matchData.traitDataMap.openness      >= 70)
          &&  (matchData.traitDataMap.neuroticism   >= 70)
        );
      },
      "best-buddies": function (matchData) {
        return (
              (matchData.traitDataMap.openness      >= 70)
          &&  (matchData.traitDataMap.agreeableness >= 70)
          &&  (matchData.traitDataMap.neuroticism   <= 30)
        );
      },
      "workhorses": function (matchData) {
        return (
              (matchData.traitDataMap.consciousness >= 70)
          &&  (matchData.traitDataMap.extraversion  >= 50)
          &&  (matchData.traitDataMap.agreeableness >= 50)
        );
      },
      "happy-spouses": function (matchData) {
        return (
              (matchData.traitDataMap.openness      >= 70)
          &&  (matchData.traitDataMap.agreeableness >= 70)
          &&  (matchData.traitDataMap.neuroticism   <= 30)
        );
      },
      "party-kings": function (matchData) {
        return (
              (matchData.traitDataMap.openness      >= 50)
          &&  (matchData.traitDataMap.consciousness <= 30)
          &&  (matchData.traitDataMap.extraversion  >= 70)
        );
      }/*,
      "special_precondition": function (matchData) {
        return matchData.traitDataList.some(function (traitData) {

          return (traitData.value >= 70);
        });
      }*/
    },
    filterModelByCategory = function (matchesModel, categoryType) {
      var filteredModel = [];
      if ((categoryType == "special-cases")/* && matchesModel.some(categoryFilterMap["special_precondition"])*/) {

      } else {
        filteredModel = matchesModel.filter(categoryFilterMap[categoryType] || noop);
      }
      return filteredModel;
    },


    mapMatchData = function (obj) {
      return {


    // used by the view

        avatarSrc : toString(obj.picture),
        accountId : toString(obj.tHand),
        realName  : toString(obj.name),

        traitDataList : [{
          name  : "Openness",
          value : toNumber(obj.traits.openn)
        }, {
          name  : "Consciousness",
          value : toNumber(obj.traits.consc)
        }, {
          name  : "Extraversion",
          value : toNumber(obj.traits.extra)
        }, {
          name  : "Agreeableness",
          value : toNumber(obj.traits.agree)
        }, {
          name  : "Neuroticism",
          value : toNumber(obj.traits.neuro)
        }],


    // used by the model itself in order to support easy filtering

        traitDataMap : {
          "openness"      : toNumber(obj.traits.openn),
          "consciousness" : toNumber(obj.traits.consc),
          "extraversion"  : toNumber(obj.traits.extra),
          "agreeableness" : toNumber(obj.traits.agree),
          "neuroticism"   : toNumber(obj.traits.neuro)
        }
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
    createModel : reduceMatchDataList,

    filterModelByCategory: filterModelByCategory
  };


  return (appRoot.model.CategoryMatches = module);


}(tf, window/*, jQuery*/));
