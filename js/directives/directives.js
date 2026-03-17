// ============================================
//  directives/directives.js
// ============================================

// ── carCard directive ─────────────────────
app.directive('carCard', ['CarService', function(CarService) {
  return {
    restrict: 'E',
    scope: {
      car:       '=',
      onOpen:    '&',
      listMode:  '='
    },
    templateUrl: 'views/partials/car-card.html',
    link: function(scope) {
      scope.isWishlisted = function() { return CarService.isWishlisted(scope.car.id); };

      scope.toggleWishlist = function($event) {
        $event.stopPropagation();
        CarService.toggleWishlist(scope.car.id);
      };

      scope.open = function() {
        scope.onOpen({ car: scope.car });
      };

      scope.badgeClass = function(badge) {
        var map = { 'Electric': 'electric', 'Luxury': 'luxury', 'Rare Find': 'rare', 'New': 'new' };
        return map[badge] || '';
      };
    }
  };
}]);

// ── ratingStars directive ─────────────────
app.directive('ratingStars', function() {
  return {
    restrict: 'E',
    scope: { rating: '=' },
    template: '<span class="stars">{{ starsStr }}</span> <span>{{ rating }}</span>',
    link: function(scope) {
      scope.$watch('rating', function(val) {
        if (!val) return;
        var full  = Math.floor(val);
        var half  = (val - full) >= 0.5 ? 1 : 0;
        var empty = 5 - full - half;
        scope.starsStr = '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
      });
    }
  };
});

// ── scrollTop directive: scrolls view to top on route change ──
app.directive('scrollTop', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    link: function() {
      $rootScope.$on('$routeChangeSuccess', function() {
        window.scrollTo(0, 0);
      });
    }
  };
}]);

// ── closeOnEsc directive: closes modal on Escape key ──
app.directive('closeOnEsc', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var handler = function(e) {
        if (e.key === 'Escape') {
          scope.$apply(function() {
            scope[attrs.closeOnEsc]();
          });
        }
      };
      document.addEventListener('keydown', handler);
      scope.$on('$destroy', function() {
        document.removeEventListener('keydown', handler);
      });
    }
  };
});
