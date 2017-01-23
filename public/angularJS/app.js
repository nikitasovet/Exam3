(function(){
  var app = angular.module('myApp',['ngRoute']);

  app.directive('header',function(){
    return{
      restrict:'A',
      templateUrl:'partials/common/header.html'
    }
  });

  app.controller('header',function(){

  });

  app.controller('hotelHome',function(HotelService, $scope){
    $scope.hotels = [];
    HotelService.hotelgetAll().then(function(response) {
      $scope.hotels = response.data; // Rempli la variable avec les données
    });

  });
  app.controller('hotelPage',function(HotelService,$scope,$routeParams,$templateCache,$route){
    var hotelId = $routeParams.hotelid; // On récupère l'id qui est dans l'url
    $scope.hotel = {};
    HotelService.hotelgetOne(hotelId).then(function(response) {
      $scope.hotel = response.data; // Rempli la variable avec les données
    });

    this.addOneComment = function() {
      let comment = {
        name: $scope.pseudo,
        rating: $scope.note,
        commentaire: $scope.text
      }
      console.log('ici');
      HotelService.hoteladdOneComment(hotelId, comment).then(function(response) {
        // Le traditionnel window.location.href ne semble pas fonctionner si on redirige vers la
        // même page avec angular. Ducoup on recharge la route de cette manière.
        var currentPageTemplate = $route.current.templateUrl;
        $templateCache.remove(currentPageTemplate);
        $route.reload();
      });
    }
  });

  app.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/',{
       templateUrl:'partials/home.html',
       controller:'hotelHome',
       controllerAs:'hotelHomeCtrl'
      })
    .when('/hotel/:hotelid',{
      templateUrl:'partials/hotel.html',
      controller:'hotelPage',
      controllerAs:'hotelPageCtrl'
    });
  }]);

  // Définition du service HotelService
app.factory('HotelService', function($http) {
  return {
      hotelgetAll: hotelgetAll, // Retourne tous les hotel
      hotelgetOne: hotelgetOne, // Retourne un seul hotel
      hoteladdOneComment: hoteladdOneComment //ajouter un commentaire

  };

  function hotelgetAll() {
      return $http.get('/api/hotel').then(complete).catch(failed);
  }
  function hotelgetOne(hotelid) {
      return $http.get('/api/hotel/' + hotelid).then(complete).catch(failed);
  }
  function hoteladdOneComment(hotelid, Comment){
    return $http.post('/api/hotel/' +hotelid, Comment).then(complete).catch(failed);
  }
  function complete(response) {
      return response;
  }
  function failed(error) {
      console.log(error.statusText);
  }
});


}());
