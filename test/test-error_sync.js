if (module == require.main) {
  return require('../lib/async_testing').run(process.argv);
}

module.exports = {
  'test sync error': function(test) {
    throw new Error();
  }
}
