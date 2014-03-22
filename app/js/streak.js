(function() {
  'use strict';
  window.streak = angular.module('streak', ['streak.config', 'streak.router',
                                 'streak.firebase', 'routeSecurity']);
}());
