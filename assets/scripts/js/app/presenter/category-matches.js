/**
 *  poor men's module - but is considered to be sufficient enough in oder to solve the task.
 */
(function (appRoot, global, $) {


  var
    Observable = global.Observable_SignalsAndSlots,


    MatchesModel    = appRoot.model.CategoryMatches,
    MatchesView     = appRoot.view.CategoryMatches,

    CategoryFilter  = appRoot.presenter.CategoryFilter,


    module,


    $matchDetails,
    $categoryMatches,
    $categoryMatchList,


    baseMatchesModel,


    getJsonMockData = function (mockId) {
      return document.getElementById("json-mock-data_" + mockId).text.trim();
    },


    clearMatchDetails = function () {
      $matchDetails.empty();
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


    refineMatchList = function (categoryType) {

      var matchesModel =

        categoryType

        ? MatchesModel.filterModelByCategory(baseMatchesModel, categoryType)
        : baseMatchesModel
      ;

      clearMatchDetails();
      clearMatchList();

      renderMatchList(matchesModel);
    },
    createMatchList = function () {
//console.log("CategoryMatches :: createMatchList", getJsonMockData("category-matches"));

      baseMatchesModel = MatchesModel.createModel(
        JSON.parse(getJsonMockData("category-matches"))
      );
console.log("CategoryMatches :: createMatchList", baseMatchesModel);

      clearMatchList();
      renderMatchList(baseMatchesModel);
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
    handleCategoryChange = function (evt) {
console.log("CategoryMatches :: handleCategoryChange", evt);

      refineMatchList(evt.categoryType);
    },


    initializePresenter = function () {
console.log("CategoryMatches :: initializePresenter");

      MatchesView.initialize();

      var $matcher = $(".category-matcher");

      $matchDetails = $matcher.find(".match-details");
      $categoryMatches = $matcher.find(".category-matches");

      $categoryMatchList = $categoryMatches.find("> ul");

      createMatchList();

      $categoryMatches.on("click", "> ul > li", handleMatchDetails);

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
