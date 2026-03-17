// ============================================
//  controllers/controllers.js
// ============================================

// ── NavCtrl — active link, wishlist count ──
app.controller('NavCtrl', ['$scope', '$location', 'CarService',
function($scope, $location, CarService) {

  $scope.isActive = function(path) {
    return $location.path() === path;
  };

  $scope.wishlistCount = function() {
    return CarService.getWishlist().length;
  };

  $scope.goTo = function(path) {
    $location.path(path);
  };
}]);

// ── HomeCtrl ────────────────────────────────
app.controller('HomeCtrl', ['$scope', '$location', 'CarService',
function($scope, $location, CarService) {

  $scope.featured = [];
  $scope.stats    = { cars: 0, categories: 0, verified: 100 };
  $scope.loading  = true;

  CarService.getCars().then(function(cars) {
    $scope.featured = cars.filter(function(c) { return c.featured; }).slice(0, 6);
    $scope.stats.cars = cars.length;
    $scope.stats.categories = (function() {
      var set = {};
      cars.forEach(function(c) { if (c.category) set[c.category] = true; });
      return Object.keys(set).length;
    })();
    $scope.loading  = false;
  });

  $scope.totalCars = function() { return $scope.featured.length; };

  $scope.goToCatalog = function() { $location.path('/catalog'); };

  $scope.openModal = function(car) { $scope.$broadcast('openModal', car); };
  $scope.isWishlisted = function(id) { return CarService.isWishlisted(id); };

  $scope.goToDetail = function($event, car) {
    if ($event) $event.stopPropagation();
    if (!car || car.id == null) return;
    $location.path('/car/' + car.id);
  };
}]);

// ── CatalogCtrl ─────────────────────────────
app.controller('CatalogCtrl', ['$scope', '$location', 'CarService',
function($scope, $location, CarService) {

  $scope.cars       = [];
  $scope.categories = [];
  $scope.loading    = true;

  // Filter state
  $scope.searchQuery   = '';
  $scope.activeCategory = 'All';
  $scope.sortBy        = 'featured';
  $scope.fuelFilter    = 'All';
  $scope.viewMode      = 'grid'; // 'grid' | 'list'
  $scope.selectedCar   = null;
  $scope.modalOpen     = false;

  // Load data
  CarService.getCars().then(function(cars) {
    $scope.cars    = cars;
    $scope.loading = false;
  });

  CarService.getCategories().then(function(cats) {
    $scope.categories = cats;
  });

  // ── Filtered + sorted cars ────────────────
  $scope.filteredCars = function() {
    var result = $scope.cars;

    // Search
    if ($scope.searchQuery) {
      var q = $scope.searchQuery.toLowerCase();
      result = result.filter(function(c) {
        return (c.make + ' ' + c.model + ' ' + c.year).toLowerCase().indexOf(q) !== -1;
      });
    }

    // Category
    if ($scope.activeCategory && $scope.activeCategory !== 'All') {
      result = result.filter(function(c) { return c.category === $scope.activeCategory; });
    }

    // Fuel
    if ($scope.fuelFilter && $scope.fuelFilter !== 'All') {
      result = result.filter(function(c) { return c.fuel === $scope.fuelFilter; });
    }

    // Sort
    result = result.slice(); // copy
    if ($scope.sortBy === 'price-asc')  result.sort(function(a,b) { return a.price - b.price; });
    if ($scope.sortBy === 'price-desc') result.sort(function(a,b) { return b.price - a.price; });
    if ($scope.sortBy === 'hp-desc')    result.sort(function(a,b) { return b.horsepower - a.horsepower; });
    if ($scope.sortBy === 'rating')     result.sort(function(a,b) { return b.rating - a.rating; });
    if ($scope.sortBy === 'newest')     result.sort(function(a,b) { return b.year - a.year; });
    if ($scope.sortBy === 'featured')   result.sort(function(a,b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });

    return result;
  };

  $scope.setCategory = function(cat) { $scope.activeCategory = cat; };
  $scope.setView     = function(v)   { $scope.viewMode = v; };

  // ── Modal ─────────────────────────────────
  $scope.openModal = function(car) {
    $scope.selectedCar = car;
    $scope.modalOpen   = true;
    document.body.style.overflow = 'hidden';
  };

  $scope.goToDetail = function($event, car) {
    if ($event) $event.stopPropagation();
    if (!car || car.id == null) return;
    $scope.closeModal();
    $location.path('/car/' + car.id);
  };

  $scope.closeModal = function() {
    $scope.modalOpen = false;
    document.body.style.overflow = '';
  };

  // Close on overlay click
  $scope.overlayClick = function(e) {
    if (angular.element(e.target).hasClass('modal-overlay')) {
      $scope.closeModal();
    }
  };

  // ── Wishlist ──────────────────────────────
  $scope.isWishlisted = function(id) { return CarService.isWishlisted(id); };

  $scope.toggleWishlist = function($event, car) {
    $event.stopPropagation();
    var added = CarService.toggleWishlist(car.id);
    $scope.toastMsg  = added ? ('❤️  ' + car.make + ' ' + car.model + ' saved to wishlist') : ('🗑️  Removed from wishlist');
    $scope.showToast = true;
    clearTimeout($scope._toastTimer);
    $scope._toastTimer = setTimeout(function() {
      $scope.$apply(function() { $scope.showToast = false; });
    }, 2800);
  };

  $scope.wishlistCount = function() { return CarService.getWishlist().length; };
}]);

// ── CarDetailCtrl ─────────────────────────
app.controller('CarDetailCtrl', ['$scope', '$routeParams', '$location', 'CarService',
function($scope, $routeParams, $location, CarService) {

  $scope.car     = null;
  $scope.loading = true;

  CarService.getCarById($routeParams.id).then(function(car) {
    if (!car) { $location.path('/catalog'); return; }
    $scope.car     = car;
    $scope.loading = false;
  });

  $scope.isWishlisted = function(id) { return CarService.isWishlisted(id); };

  $scope.toggleWishlist = function() {
    CarService.toggleWishlist($scope.car.id);
    $scope.saved = CarService.isWishlisted($scope.car.id);
  };

  $scope.goBack = function() { $location.path('/catalog'); };
}]);

// ── WishlistCtrl ──────────────────────────
app.controller('WishlistCtrl', ['$scope', '$location', 'CarService',
function($scope, $location, CarService) {

  $scope.cars    = [];
  $scope.loading = true;

  function load() {
    CarService.getWishlistedCars().then(function(cars) {
      $scope.cars    = cars;
      $scope.loading = false;
    });
  }
  load();

  $scope.remove = function(car) {
    CarService.toggleWishlist(car.id);
    load();
  };

  $scope.openDetail = function(car) { $location.path('/car/' + car.id); };
  $scope.goCatalog  = function()    { $location.path('/catalog'); };
}]);
