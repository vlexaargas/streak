(function() {
  window.streak = angular.module('streak', ['streak.config', 'streak.router', 'streak.firebase']);

  streak.run(['firebaseRef', function(firebaseRef) {

    console.log(firebaseRef("/users/0").name());
  }]);
}());
