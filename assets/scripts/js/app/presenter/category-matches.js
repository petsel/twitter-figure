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


    initializePresenter = function () {
console.log("CategoryMatches :: initializePresenter");

      MatchesView.initialize();

      $categoryMatches = $(".category-matcher").find(".category-matches");
      $categoryMatchList = $categoryMatches.find("> ul")

      createMatchList();

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
