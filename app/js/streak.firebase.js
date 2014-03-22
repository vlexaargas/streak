(function() {
  'use strict';

  var fb = angular.module('streak.firebase', ['firebase', 'streak.config']);

  fb.factory('firebaseRef', ['Firebase', 'FBURL', function(Firebase, FBURL) {
    return function(path) {
      return new Firebase(FBURL + path);
    };
  }]);

  fb.factory('loginObj', ['firebaseRef', '$firebaseSimpleLogin',
    function(firebaseRef, $firebaseSimpleLogin) {
      return $firebaseSimpleLogin(firebaseRef(''));
    }
  ]);

}());
