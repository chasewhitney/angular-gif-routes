// module HomeController
console.log('client sourced!');

var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(function($routeProvider){
  // define our routes, point them at a controllers
  $routeProvider
    .when('/random', {
      controller: 'RandomController as rc',
      // template: '<h2>Home Controller</h2>'
      templateUrl: 'views/templates/random.html'
    })
    .when('/search', {
      controller: 'SearchController as gif',
      templateUrl: 'views/templates/search.html'
    })
    .when('/favorites', {
      controller:'FavoritesController as fav',
      templateUrl: 'views/templates/favorites.html'
    })
    .otherwise({
      redirectTo: '/random'
    });

});
