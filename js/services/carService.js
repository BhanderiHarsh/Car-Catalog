// ============================================
//  services/carService.js — Data & Wishlist
// ============================================

app.service('CarService', ['$http', '$q', function($http, $q) {
  var self    = this;
  var _cars   = [];
  var _loaded = false;

  // ── Load cars from JSON ──────────────────
  self.getCars = function() {
    var deferred = $q.defer();
    if (_loaded) {
      deferred.resolve(_cars);
    } else {
      $http.get('data/cars.json').then(function(res) {
        _cars   = res.data;
        _loaded = true;
        deferred.resolve(_cars);
      }, function(err) {
        deferred.reject(err);
      });
    }
    return deferred.promise;
  };

  // ── Get single car by id ─────────────────
  self.getCarById = function(id) {
    return self.getCars().then(function(cars) {
      return cars.find(function(c) { return c.id === parseInt(id); });
    });
  };

  // ── Get unique categories ────────────────
  self.getCategories = function() {
    return self.getCars().then(function(cars) {
      var cats = cars.map(function(c) { return c.category; });
      return ['All'].concat(cats.filter(function(v, i, a) { return a.indexOf(v) === i; }));
    });
  };

  // ── Wishlist (localStorage) ──────────────
  self.getWishlist = function() {
    try {
      return JSON.parse(localStorage.getItem('car_wishlist') || '[]');
    } catch(e) { return []; }
  };

  self.toggleWishlist = function(carId) {
    var list = self.getWishlist();
    var idx  = list.indexOf(carId);
    if (idx === -1) { list.push(carId); }
    else            { list.splice(idx, 1); }
    localStorage.setItem('car_wishlist', JSON.stringify(list));
    return idx === -1; // true = added
  };

  self.isWishlisted = function(carId) {
    return self.getWishlist().indexOf(carId) !== -1;
  };

  self.getWishlistedCars = function() {
    var ids = self.getWishlist();
    return self.getCars().then(function(cars) {
      return cars.filter(function(c) { return ids.indexOf(c.id) !== -1; });
    });
  };
}]);
