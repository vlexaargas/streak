(function() {
  "use strict";

  angular.module('streak.router', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider
      .when("/", {
        templateUrl: "partials/home.html"
      })
      .otherwise({
        redirectTo: "/"
      });

    }]);

}());
