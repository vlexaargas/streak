(function() {
  var fb = angular.module("streak.firebase", ["firebase"]);

  fb.factory("firebaseRef", ['Firebase', 'FBURL', function(Firebase, FBURL) {
    return function(path) {
      return new Firebase(FBURL + path);
    };
  }]);

}());
