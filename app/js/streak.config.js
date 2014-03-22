(function() {
  'use strict';

  angular.module('streak.config', [])
    .constant('FBURL', 'https://streak.firebaseio.com')
    .constant('loginRedirectPath', '/');

}());
