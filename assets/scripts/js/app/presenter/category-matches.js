/**
 *  poor men's module - but is considered to be sufficient enough in oder to solve the task.
 */
(function (appRoot, global, $) {


  var
    Observable = global.Observable_SignalsAndSlots,


    MatchesModel  = appRoot.model.CategoryMatches,
    MatchesView   = appRoot.view.CategoryMatches,

    CategoryFilter        = appRoot.presenter.CategoryFilter,


    module,


    $matchDetails,
    $categoryMatches,
    $categoryMatchList,


    getJsonMockData = function (mockId) {
      return document.getElementById("json-mock-data_" + mockId).text.trim();
    },


    clearMatchList = function () {
      $categoryMatchList.empty();
    },
    renderMatchList = function (matchesModel) {
      var
        $elm = $(MatchesView.render(matchesModel))
      ;
      $categoryMatchList.replaceWith($elm);
      $categoryMatchList = $elm;
    },


    createMatchList = function () {
//console.log("CategoryMatches :: createMatchList", getJsonMockData("category-matches"));

      var matchesModel = MatchesModel.createModel(
        JSON.parse(getJsonMockData("category-matches"))
      );
console.log("CategoryMatches :: createMatchList", matchesModel);

      clearMatchList();
      renderMatchList(matchesModel);
    },


    handleCategoryChange = function (evt) {
console.log("CategoryMatches :: handleCategoryChange", evt);

    },


    showMatchDetailsFromItemQuery = function ($matchItem) {

      $matchDetails.empty();
      $matchItem.children().toArray().forEach(function (childNode/*, idx list*/) {

        $matchDetails[0].appendChild(childNode.cloneNode(true));
      });
    },
    handleMatchDetails = function (evt) {
      evt.stopPropagation();

      showMatchDetailsFromItemQuery($(evt.currentTarget));
    },


    initializePresenter = function () {
console.log("CategoryMatches :: initializePresenter");

      MatchesView.initialize();

      $matchDetails = $(".category-matcher").find(".match-details");
      $categoryMatches = $(".category-matcher").find(".category-matches");
      $categoryMatchList = $categoryMatches.find("> ul");

      createMatchList();

      $categoryMatches.on("click", "> ul > li", handleMatchDetails)

      CategoryFilter.addEventListener("categorychange", handleCategoryChange);
      CategoryFilter.initialize();
    }
  ;


  module = {

  //getElementQuery : function () {return $categoryMatches;},
    initialize      : initializePresenter
  };
  Observable.call(module); // make presenter abstraction observable.


  return (appRoot.presenter.CategoryMatches = module);


}(tf, window, jQuery));
