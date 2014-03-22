describe "streak.auth", ->

  Auth = null
  loginObj = null
  $rootScope = null

  userData = {
    'uid': '03294203948203',
    'email': 'wut@test.com',
    'provider': 'password',
    'id': 9000
  }

  beforeEach(module('streak.auth'))
  beforeEach(module('streak.firebase'))

  angular.module('streak.firebase').factory(
    'loginObj', [
      '$q', ($q)->
        defered = $q.defer()
        defered.resolve(userData)
        return {
          $login: jasmine.createSpy('$login').andReturn(defered.promise)
          $logout: jasmine.createSpy('$logout')
        }
  ])


  beforeEach(inject(($injector) ->
    loginObj = $injector.get('loginObj')
    Auth = $injector.get('Auth')
    $rootScope = $injector.get('$rootScope')
  ))

  describe "#loginFacebook", ->

    it "should exist", ->
      expect(typeof Auth.loginFacebook).toEqual("function")

    it "should login with Facebook", ->
      Auth.loginFacebook()
      expect(loginObj.$login).toHaveBeenCalledWith('facebook')

  describe "#loginTwitter", ->
    it "should exist", ->
      expect(typeof Auth.loginTwitter).toEqual("function")

    it "should login with Twitter", ->
      Auth.loginTwitter()
      expect(loginObj.$login).toHaveBeenCalledWith('twitter')

  describe "#loginEmail", ->

    it "should exist", ->
      expect(typeof Auth.loginEmail).toEqual("function")


    it "should login with email", ->
      Auth.loginEmail('test@test.com', 'superadmin')
      expect(loginObj.$login).toHaveBeenCalledWith('password', {
        email: 'test@test.com',
        password: 'superadmin'
      })

  describe "#logout", ->
    it "should exist", ->
      expect(typeof Auth.logout).toEqual("function")

    it "should logout", ->
      Auth.logout()
      expect(loginObj.$logout).toHaveBeenCalled()

  describe "#isLoggedIn", ->
    it "should return false before logging in", ->
      expect(Auth.isLoggedIn()).toBe(false);

    it "should return true after logging in with Facebook", ->
      Auth.loginFacebook()
      $rootScope.$apply()
      expect(Auth.isLoggedIn()).toBe(true)

    it "should return true after logging in with Twitter", ->
      Auth.loginTwitter()
      $rootScope.$apply()
      expect(Auth.isLoggedIn()).toBe(true)

    it "should return true after logging in with email", ->
      Auth.loginEmail('email@email.com', 'password')
      $rootScope.$apply()
      expect(Auth.isLoggedIn()).toBe(true)

    it "should return false after logging out", ->
      Auth.loginFacebook();
      $rootScope.$apply();
      Auth.logout();
      expect(Auth.isLoggedIn()).toBe(false)


  describe "#getUser", ->
    it "should return null before login", ->
      expect(Auth.getUser()).toBe(null);

    it "should return the user object after login", ->
      Auth.loginFacebook()
      $rootScope.$apply()
      expect(Auth.getUser()).toBe(userData);

    it "should return null after logout", ->
      Auth.loginFacebook()
      $rootScope.$apply()
      Auth.logout();
      expect(Auth.getUser()).toBe(null);
