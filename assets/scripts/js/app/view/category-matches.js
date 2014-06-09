/**
 *  poor men's module - but is considered to be sufficient enough in oder to solve the task.
 */
(function (appRoot, global, $) {


  var
    module,


    keys = global.Object.keys,


    partials = {

      "matchesRoot" : '<ul\/>',
      "matchItem"   : [
                      '<li>',
                        '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="avatar or real picture of " title="">',
                        '<h3><\/h3>',
                        '<h4><\/h4>',
                      '<\/li>'
      ].join(""),

      "traitsRoot"  : '<dl class="traits"\/>',
      "traitName"   :   '<dt></dt>',
      "traitValue"  :   '<dd data-value><span></span></dd>'
    },


    renderTraitName = function (traitData) {
      var
        $elmNode = $(partials.traitName.cloneNode(true))
      ;
    //$elmNode.text(traitData.name);
      $elmNode.html(traitData.name);

      return $elmNode[0];
    },
    renderTraitValue = function (traitData) {
      var
        $elmNode = $(partials.traitValue.cloneNode(true))
      ;
    //$elmNode.find("span").eq(0).text(traitData.value);
      $elmNode.find("span").eq(0).html(traitData.value);
      $elmNode.attr("data-value", traitData.value);

      return $elmNode[0];
    },

    renderMatch = function (matchModel) {
      var
        $elmNode = $(partials.matchItem.cloneNode(true)),
        $img = $elmNode.find("img").eq(0)
      ;
      $img[0].src = matchModel.avatarSrc;
      $img.attr("title", matchModel.realName);
      $img.attr("alt", ($img.attr("alt") + matchModel.realName));

      $elmNode.find("h3").text(matchModel.realName);
    //$elmNode.find("h3").html(matchModel.realName);

      $elmNode.find("h4").text(matchModel.accountId);
    //$elmNode.find("h4").html(matchModel.accountId);

      $elmNode[0].appendChild(
        matchModel.traitDataList.reduce(function (elmNode, traitData) {

          elmNode.appendChild(renderTraitName(traitData));
          elmNode.appendChild(renderTraitValue(traitData));
          return elmNode;

        }, partials.traitsRoot.cloneNode(true))
      );
      return $elmNode[0];
    },

    renderMatchList = function (matchesModel) {
      return matchesModel.reduce(function (elmNode, matchModel) {

        elmNode.appendChild(renderMatch(matchModel));
        return elmNode;

      }, partials.matchesRoot.cloneNode(true));
    },


    initializeView = function () {
      keys(partials).forEach(function (key) {

        var partial = partials[key];
        if (typeof partial == "string") { // - prevent already transformed nodes from mess
                                          //   in case of multiple calls for [initialize].

          partials[key] = $(partial)[0];  // - pure DOM nodes / no jQuery overhead.
        }
      });
console.log("CategoryMatches ::  VIEW :: initializeView", partials);
    }
  ;


  module = {

  //renderMatch : renderMatch,            // - could be exposed for better code reuse if necessary.
    render      : renderMatchList,
    initialize  : initializeView
  };
  return (appRoot.view.CategoryMatches = module);


}(tf, window, jQuery));
