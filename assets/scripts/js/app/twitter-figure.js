/**
 *  poor men's module system root - but is considered to be sufficient enough in oder to solve the task.
 */
(function (global, $) {


  var
    tf = global.tf = {

    //util      : {},
      model     : {},
      view      : {},
      presenter : {}
    },


    initializeApplication = function () {

      tf.presenter.CategoryMatches.initialize();
    }
  ;


  $(initializeApplication);


//return tf;


}(window, jQuery));
