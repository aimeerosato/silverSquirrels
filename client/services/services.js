angular.module('hikexpert.services', [])

.factory('Home', function($http){

  var getCoords = function(userInfo){
    return $http({
      method: 'POST',
      url: 'api/coords',
      data: userInfo
    }).then(function(resp){
      return resp.data;
    });
  };

  var getUser = function(){
    return $http({
      method: 'GET',
      url: '/getUser'
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  // Puts trails in hasDone or wantToDo arrays, based on the url endpoint used
  var trailPost = function (trailName, url) {
    var trailObj = {
      trailName : trailName
    };
    return $http({
      method: 'POST',
      url : url,
      data : trailObj
    });
  };

  return {
    trailPost : trailPost,
    getUser : getUser,
    getCoords : getCoords
  };
})

.factory('Auth', function($http, $location, $window) {
  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };
  
  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };
  
  var isAuth = function() {
    return !!$window.localStorage.getItem('com.hikexpert');
  };
  
  var signout = function() {
    $window.localStorage.removeItem('com.hikexpert');
    $location.path('/signin');
  };
  
  return {
    signin : signin,
    signup : signup,
    isAuth : isAuth,
    signout : signout
  };
})

//TODO: service for shared trial information
.factory('Info', function($http) {
  var getInfo = function(info) {
    return $http({
      method: 'POST',
      url: 'api/trailinfo',
      data: info
    })
    .then(function(res) {
      console.log("still in factory");
      return res.data;
    });
  };
  return {
    getInfo: getInfo 
  };
})

.factory('InfoStorage', function(){
    var packagedInfo = {};

    var clearData = function() {
        for(var key in packagedInfo){
          delete packagedInfo[key];
        }
      };
    return {
      setData: function(info) {
        console.log("before delete :" + packagedInfo);
        clearData();
        console.log("after delete :" + packagedInfo);
        packagedInfo['lat'] = info[0];
        packagedInfo['lng'] = info[1];
        console.log(packagedInfo);
      },
      getData: function() { 
        return packagedInfo;
      }
      
    }
});

