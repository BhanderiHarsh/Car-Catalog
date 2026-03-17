// ============================================
//  filters/filters.js — Custom Filters
// ============================================

// Format price as $XXX,XXX
app.filter('currency2', function() {
  return function(value) {
    if (!value && value !== 0) return '';
    return '$' + parseInt(value).toLocaleString('en-US');
  };
});

// Format mileage
app.filter('mileage', function() {
  return function(value) {
    if (value === 0) return 'Brand New';
    return parseInt(value).toLocaleString('en-US') + ' mi';
  };
});

// Star rating string
app.filter('stars', function() {
  return function(rating) {
    var full  = Math.floor(rating);
    var half  = (rating - full) >= 0.5 ? 1 : 0;
    var empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };
});

// Badge CSS class
app.filter('badgeClass', function() {
  return function(badge) {
    if (!badge) return '';
    var map = {
      'Electric':  'electric',
      'Luxury':    'luxury',
      'Rare Find': 'rare',
      'New':       'new'
    };
    return map[badge] || '';
  };
});

// Short engine label
app.filter('shortEngine', function() {
  return function(engine) {
    if (!engine) return '';
    // Truncate long engine strings
    return engine.length > 20 ? engine.substring(0, 18) + '…' : engine;
  };
});
