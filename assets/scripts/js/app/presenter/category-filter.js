/**
 *  poor men's module - but is considered to be sufficient enough in oder to solve the task.
 */
(function (appRoot, global, $) {


  var
    Observable = global.Observable_SignalsAndSlots,


    module,


    timeoutIdCategoryChange,


    $categoryFilter,
    currentCategoryControl = null,


    handleCategoryChange = function (evt) {
      evt.stopPropagation();

      var
        categoryItem  = evt.currentTarget,
        $categoryItem = $(categoryItem),

        categoryControl = $categoryItem.find("input")[0]
      ;

      if (categoryControl === currentCategoryControl) {
        categoryControl.checked = !categoryControl.checked;

        currentCategoryControl = null;
      } else {
        currentCategoryControl = categoryControl;
      }

      module.dispatchEvent({
        type        : "categorychange",
        filterType  : currentCategoryControl ? currentCategoryControl.value : "",
        itemQuery   : $categoryItem
      });
    },
    handleCategoryChangeDelayed = function (evt) {
      clearTimeout(timeoutIdCategoryChange);
      timeoutIdCategoryChange = setTimeout(function () {

        handleCategoryChange(evt);

      }, 20);
    },


    initializePresenter = function () {
console.log("CategoryFilter :: initializePresenter");

      $categoryFilter = $(".category-matcher").find(".category-filter");
      $categoryFilter.on("click", "> ul > li", handleCategoryChangeDelayed);
    }
  ;


  module = {

  //getElementQuery : function () {return $categoryFilter;},
    initialize      : initializePresenter
  };
  Observable.call(module); // make presenter abstraction observable.


  return (appRoot.presenter.CategoryFilter = module);


}(tf, window, jQuery));
