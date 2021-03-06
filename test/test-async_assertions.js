if (module == require.main) {
  return require('../lib/async_testing').run(process.argv);
}

module.exports = {
  'test success': function(test) {
    setTimeout(function() {
        test.ok(true, 'This should be true');
        test.finish();
      }, 500);
  },

  'test fail': function(test) {
    setTimeout(function() {
        test.ok(false, 'This should be false');
        test.finish();
      }, 500);
  },

  'test success -- numAssertions expected': function(test) {
    test.numAssertions = 1;
    setTimeout(function() {
        test.ok(true, 'This should be true');
        test.finish();
      }, 500);
  },

  'test fail -- numAssertions expected': function(test) {
    test.numAssertions = 1;
    setTimeout(function() {
        test.ok(false, 'fail -- numAssertions expected shouldn\'t overwrite failures');
        test.finish();
      }, 500);
  },

  'test fail - not enough -- numAssertions expected': function(test) {
    test.numAssertions = 1;
    setTimeout(function() {
        test.finish();
      }, 500);
  },

  'test fail - too many -- numAssertions expected': function(test) {
    test.numAssertions = 1;
    setTimeout(function() {
        test.ok(true, 'This should be true');
        test.ok(true, 'This should be true');
        test.finish();
      }, 500);
  }
}
