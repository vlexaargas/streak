(function() {
  'use strict';

  function Auth(loginObj) {

    var currentUser = null;

    function login(provider, options) {
      var promise;
      if (options) {
        promise = loginObj.$login(provider, options);
      } else {
        promise = loginObj.$login(provider);
      }

      promise.then(function(user) {
        currentUser = user;
      });

      return promise;
    }


    return {

      isLoggedIn: function() {
        return currentUser !== null;
      },

      getUser: function() {
        return currentUser;
      },

      loginFacebook: function() {
        return login('facebook');
      },

      loginTwitter: function() {
        login('twitter');
      },

      loginEmail: function(email, password) {
        login('password', {
          email: email,
          password: password
        });
      },

      logout: function() {
        currentUser = null;
        loginObj.$logout();
      }

    };
  }

  angular.module('streak.auth', ['streak.firebase'])
  .factory('Auth', ['loginObj', Auth]);


}());
