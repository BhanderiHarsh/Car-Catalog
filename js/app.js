// ============================================
//  app.js — AngularJS Module & Route Config
// ============================================

var app = angular.module('carCatalogApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/catalog', {
      templateUrl: 'views/catalog.html',
      controller: 'CatalogCtrl'
    })
    .when('/car/:id', {
      templateUrl: 'views/car-detail.html',
      controller: 'CarDetailCtrl'
    })
    .when('/wishlist', {
      templateUrl: 'views/wishlist.html',
      controller: 'WishlistCtrl'
    })
    .otherwise({ redirectTo: '/' });

  // Use hash-based routing so it works without a server
  $locationProvider.hashPrefix('!');
}]);
